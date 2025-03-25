const convertDate = (ISODate) => {
    return new Date(ISODate).toLocaleDateString()
}

export default convertDate;