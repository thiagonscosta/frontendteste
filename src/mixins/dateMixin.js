export default {
    methods: {
        getExtensiveDate(dt) {

            const date = new Date(dt)
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            const extDate = `${month}, ${year}`

            return extDate
        }
    }
}