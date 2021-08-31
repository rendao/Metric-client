<template>
    <div class="page-home-wrap mt-4">
        <!-- tests list -->
        <b-container class="test-wrap">
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
                <b-button :href="'/test/'+test.code+'/question'" size="md" pill variant="success"
                                class="px-4">Start</b-button>
            </div>
        </b-container>
    </div>
</template>

<script>
    import { test } from '@/api/test';
    export default {
        data() {
            return {
                test: {}
            }
        },
        created() {
            this.code = this.$route.params.code;
            this.getTest();
        },
        methods: {
            getTest() {
                test(this.code).then(response =>  {
                    this.test = response.data;
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>