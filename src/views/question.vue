<template>
    <div class="page-question-wrap">
        <b-container>
            <b-overlay :show="loading" spinner-variant="warning" spinner-type="grow" spinner-small rounded="sm">
                <b-form @submit="onSubmit" @reset="onReset">
                    <b-progress class="mt-4" :max="test.total" height="0.45rem" variant="info" animated>
                        <b-progress-bar :value="(questionIndex+1)"></b-progress-bar>
                    </b-progress>
                    <div class="row mb-16">
                        <div class="col-md-8 mt-4">
                            <b-card class="p-4 shadow-sm block">
                                <b-form-group :label="question.question">
                                    <b-form-radio-group v-model="option" plain stacked>
                                        <b-form-radio v-for="(opt, k) in question.options" :value="opt" :key="k">
                                            {{opt.label}}
                                        </b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>
                                <!-- <div class="mt-3">Selected: <strong>{{ option }}</strong></div>   -->
                            </b-card>
                        </div>
                        <div class="col-md-4 mt-4">
                            <b-button type="submit" variant="secondary" block :disabled="!option || disabled">
                                <b-spinner small v-if="disabled"></b-spinner> Next
                            </b-button>
                        </div>
                    </div>
                </b-form>
            </b-overlay>
        </b-container>
    </div>
</template>

<script>
import { start, answer } from '@/api/test';
export default {
    data () {
        return {
            loading: false,
            btnLoading: false,
            type: 'text',
            option: null,
            testCode: null,
            session_code: null,
            questionIndex: 0,
            answered_count: 0,
            test: {},
            questions: [],
            startTime: 0,
            endTime: 0,
            disabled: false,
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
            this.loading = true;
            start(this.testCode).then(response => {
                console.log('questions', response);
                let { session_code, test, questions, answered_count } = response;
                this.session_code = session_code || null;
                this.test = test || {};
                this.questions = questions || [];
                this.answered_count = answered_count || 0;
                this.startTime = new Date().valueOf();
            }).finally(() => {
                this.loading = false;
            })
        },
        postAnswer () {
            let { questionIndex, startTime, option, session_code, test, question } = this;
            let endTime = new Date().valueOf();
            let duration = parseInt((endTime - startTime) / 1000);
            let params = {
                code: test.code,
                session_code,
                trait: question.trait,
                question_code: question.code,
                question_position: question.position,
                duration,
                option
            };
            console.log(params);
            this.disabled = true;
            answer(params).then(response => {
                console.log('answer', response);
                this.option = null;
                let { test_session } = response;
                console.log('test_session', test_session)
                if (test_session.status == 'completed') {
                    this.$router.push({path: '/test/result/' + test_session.code});
                } else {
                    if (questionIndex <= test.total - 1) {
                        this.questionIndex += 1;
                    }
                }
            }).finally(() => {
                this.disabled = false;
            });
        },
        onSubmit (e) {
            e.preventDefault();
            this.postAnswer();
        },
        onReset () {

        }
    },
}
</script>

<style lang="scss" scoped>
.question-progress {
    height: 0.5rem;
}
</style>