<template>
    <div class="page-result-wrap">
        result
    </div>
</template>

<script>
    import { result } from '@/api/test';

    export default {
        data() {
            return {
                loading: false,
                reslut: null,
                testSessionCode: null,
            }
        },
        created() {
            this.testSessionCode = this.$route.params.test_session_code;
            this.getResult();
        },
        methods: {
            getResult () {
                let code = this.testSessionCode;
                result(code).then(resonse => {
                    console.log(resonse);
                }).catch(err => {
                    console.log(err)
                }).finally(() => {

                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>