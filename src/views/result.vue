<template>
    <div class="page-result-wrap m-2">
    
            <b-card>
                <b-card-title><b-icon icon="award"></b-icon> Report</b-card-title>
                <b-skeleton-wrapper :loading="loading">
                    <template #loading>
                        <b-card>
                        <b-skeleton width="95%"></b-skeleton>
                        <b-skeleton width="55%"></b-skeleton>
                        <b-skeleton width="70%"></b-skeleton>
                        </b-card>
                    </template>
                    <b-card-sub-title>{{test.name}}</b-card-sub-title>
                    <b-card-text>
                        <small class="text-muted flex-grow-1">
                            <b-icon icon="clock"></b-icon> Duration: {{session.duration|formatToMin}} min
                            <!-- Completed at: {{session.completed_at}} -->
                        </small>
                    </b-card-text>
                    <b-card-text class="text-muted">{{test.short_description}}</b-card-text>
                </b-skeleton-wrapper>
                
            </b-card>

            <!-- match -->
            <b-card-group deck class="mt-2">
                <b-card v-for="(m, i) in session.result.matchs" :key="i">
                    <b-card-sub-title>
                    <b-icon icon="bookmark-star"></b-icon> {{m.trait}}
                     ({{m.score}}) 
                    </b-card-sub-title>
                    <b-card-body v-for="(ma, k) in m.match" :key="k">
                        <b-card-sub-title>{{ma.name}}</b-card-sub-title>
                        <b-card-text class="small" v-html="ma.response"></b-card-text>
                    </b-card-body>
                </b-card>
            </b-card-group>

            <b-card class="mt-2">
                 <b-button :to="testLink" size="sm" pill block variant="outline-info"><b-icon icon="bootstrap-reboot"></b-icon> Test again</b-button>
            </b-card>
    
    </div>
</template>

<script>
    import { result } from '@/api/test';

    export default {
        data() {
            return {
                loading: false,
                session: {
                    test: {},
                    matchs: {
                    }
                },
                test: {},
                testSessionCode: null,
            }
        },
        filters: {
            formatToMin(s) {
                return (s/60).toFixed(0);
            },
        },
        created() {
            this.testSessionCode = this.$route.params.test_session_code;
            this.getResult();
        },
        computed: {
            testLink () {
                let code = this.test.code;
                return '/test/' + code;
            }
        },
        methods: {
            getResult () {
                this.loading = true;
                let code = this.testSessionCode;
                result(code).then(resonse => {
                    console.log(resonse);
                    let { test } = resonse;
                    this.session = resonse;
                    this.test = test;
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>