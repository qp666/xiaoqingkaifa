export default {
    props: {
        'loading': {
            type: Boolean,
            default: false
        },
        'title': {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            page: {}
        }
    },
    computed: {},
    methods: {
        // 捕捉touchmove事件
        touchmoveCatcher() {}
    }
}