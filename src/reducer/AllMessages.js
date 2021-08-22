const AllMessages = (state = {}, action) => {
    

    switch (action.type) {
        case 'ADD':
            let data = [];
            if(state.hasOwnProperty(action.toName))
            {
                data = state[action.toName];
            }
            data.push({
                Name: action.Name,
                Message: action.Message,
            });
            return {
                ...state,
                [action.toName]:data
            }

        default:
            return state;
    }
};

export default AllMessages;