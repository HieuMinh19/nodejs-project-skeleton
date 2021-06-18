module.exports = {
    validateCategoryName(name) {
        if (!name) {
            return {
                isSuccess: false,
                message: "Category Name is required",
            }
        }

        return {
            isSuccess: true,
            message: ''
        }
    }
}
