const months = {
    1: "January",
    2: "Febuary",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

export const getInitials = (author) => {
    if (author.indexOf(" ") > -1) {
        let names = author.split(" ");
        console.log(names);
        return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    } else {
        return author.charAt(0).toUpperCase() + author.charAt(1).toUpperCase();
    }
}

export const dateToStr = (dte) => {
    const day = dte.getDate();
    const month = dte.getMonth();
    const year = dte.getFullYear();
    return year+'-'+month+'-'+day;
}

export const getMonthName = (month) => {
    try {
        return months[month];
    } catch (err) {
        return "Error occurred: " + err
    }
}

export const getDaySuffix = (day) => {
    switch (day) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
    }
}