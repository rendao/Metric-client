<template>
    <div class="page-question-wrap">
        <b-container class="my-4">

            <b-card class="p-4 shadow-sm">
                <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group :label="question.question">
                        <b-form-radio-group v-model="option" plain stacked :aria-describedby="ariaDescribedby">
                            <b-form-radio v-for="(opt, i) in question.options" :value="opt" :key="i">
                                {{opt.label}}
                            </b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>
                    <div class="mt-3">Selected: <strong>{{ option }}</strong></div>
                </b-form>
            </b-card>
        </b-container>
    </div>
</template>

<script>
import { start } from '@/api/test';
export default {
    data () {
        return {
            type: 'text',
            option: null,
            testCode: null,
            session_code: null,
            questionIndex: 0,
            answered_count: 0,
            test: {},
            questions: [],
        }
    },
    created () {
        this.testCode = this.$route.params.test_code;
        this.questionIndex = this.$route.params.question_index || 0;
        this.getQuestions();
    },
    watch: {

    },
    computed: {
        question () {
            let { questionIndex, questions } = this;
            let quest = questions[questionIndex] || {};
            console.log(quest);
            return quest;
        },
    },
    methods: {
        getQuestions () {
            start(this.testCode).then(response => {
                console.log('questions', response);
                let { session_code, test, questions, answered_count } = response;
                this.session_code = session_code || null;
                this.test = test || {};
                this.questions = questions || [];
                this.answered_count = answered_count || 0;
            })
        },
        onSubmit () {

        },
        onReset () {

        }
    },
}
</script>

<style lang="scss" scoped>
</style>