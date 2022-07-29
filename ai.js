//func for combination numbers
const getCardCombinations = (number) => {
    let combinations = [];
    switch(number) {
        case 1:
            combinations = [[1]];
            break;
        case 2:
            combinations = [[1, 1], [2]];
            break;
        case 3:
            combinations = [[1, 2], [1, 1, 1], [3]];
            break;
        case 4:
            combinations = [[2, 2], [1, 3], [1, 1, 2] [1, 1, 1, 1], [4]];
            break;
        case 5:
            combinations = [[2, 3], [1, 4], [1, 1, 1, 2], [1, 1, 3], [5]];
            break;
        case 6:
            combinations = [[2, 4], [3, 3], [1, 5], [1, 1, 1, 1, 2], [1, 1, 1, 3], [1, 1, 4], [6]];
            break;
        case 7:
            combinations = [[2, 5], [3, 4], [1, 6], [1, 1, 1, 1, 3], [1, 1, 1, 4],  [1, 1, 5], [7]];
            break;
        case 8:
            combinations = [[1, 7], [3, 5], [4, 4], [1, 1, 1, 1, 4], [1, 1, 1, 5], [1, 1, 6], [8]];
            break;
        case 9:
            combinations = [[1, 1, 1, 1, 5], [1, 1, 1, 6], [1, 1, 7], [1, 8], [4, 5], [3, 6], [2, 7], [9]];
            break;
        case 10:
            combinations = [[1, 1, 1, 1, 6], [1, 1, 1, 7], [1, 1, 8], [1, 9], [5, 5], [4, 6], [3, 7], [2, 8], [10]];
            break;
        default:
            combinations = []
    }

    return combinations;
}

