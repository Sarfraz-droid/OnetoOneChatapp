const AllMessages = (state = {}, action) => {
    

    switch (action.type) {
        case 'ERROR':
            return {
                success: false,
                message: action.message
            }
        default:
            return state;
    }
};

export default AllMessages;