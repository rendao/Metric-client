<template>
    <div class="page-home-wrap mt-4">
        <!-- tests list -->
        <b-container class="test-wrap">
            <b-overlay :show="loading" spinner-variant="warning" spinner-type="grow" spinner-small rounded="sm">
            <div class="page-header mb-4">
                <h3>{{test.name}} </h3>
            </div>
            <div class="lead">
                {{test.short_description}}
            </div>
            <div class="card mt-4">
                <div class="card-body">
                    <div v-html="test.description"></div>
                </div>
            </div>
            <div class="text-center mt-4">
                <b-button :to="'/test/'+test.code+'/question'" size="md" pill variant="success"
                                class="px-4">Start</b-button>
            </div>
            </b-overlay>
        </b-container>
    </div>
</template>

<script>
    import { test } from '@/api/test';
    export default {
        data() {
            return {
                loading: false,
                test: {}
            }
        },
        created() {
            this.code = this.$route.params.code;
            this.getTest();
        },
        methods: {
            getTest() {
                this.loading = true;
                test(this.code).then(response =>  {
                    this.test = response.data;
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>