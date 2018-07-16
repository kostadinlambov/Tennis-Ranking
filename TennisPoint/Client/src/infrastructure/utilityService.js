
export default {
    // sortByPoints: (playerArr) => {
    //     const sortedPlayersObj = playerArr.sort((a, b) => {
    //         return b.points - a.points
    //     })

    //     this.setState({
    //         playersArr: sortedPlayersObj
    //     })
    // }

    getAge: (dateString) => {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },

    convertDate: (dateString) => {
        let date = new Date(dateString)
        let birthDay = date.getDate()
        let birthMonth = date.getMonth() + 1
        let birthYear = date.getFullYear()
        if(birthDay.toString().length == 1){
            birthDay = '0' + birthDay
        }
        if(birthMonth.toString().length == 1){
            birthMonth = '0' + birthMonth
        }
        let birthDate = birthDay + '-' + birthMonth + '-' + birthYear
        return birthDate
    },

    convertEarnings: (earnings) => {
        let result = '';
        let index = 0;
        earnings.toString().split('').reverse().forEach(letter => {
            result += letter;
            index++
            if(index % 3 === 0){
                result += '.'
            }
        });

        if(result.charAt(result.length - 1) === '.'){
            result = result.substring(0, result.length-1)
        }
        result = result.split('').reverse().join('')
        result += '$'
        return result;
    }

}