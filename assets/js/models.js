
export const employeeModel = (
    id
    , fName
    , lName
    , fullName
    , department
    , phone
    , email
    , adventId
) => ({ id, fName,lName,department,phone,email,adventId })

export const advanceSectionJoinModel = (
    id
    , advanceId
    , sectionId
) => ({id, advanceId, sectionId})

export const categoryModel = (
    id
    , categoryName
    , options
    , sectionId
) => ({id, categoryName, options, sectionId})

export const adventModel = (
    id
    , eventName
    , startDate
    , endDate
    , advances
    , eventLocations
    , employees
) => ({id, eventName, startDate, endDate, advances, eventLocations, employees})

export const advanceModel = (
    id
    , advanceName
    , isAssigned
    , isComplete
    , employeeId
    , sections
    , dueDate
    , adventId
    , advanceSectionJoins
) => ({id, advanceName, isAssigned, isComplete, employeeId, sections, dueDate, advanceSectionJoins})

export const sectionModel = (
    id
    , sectionName
    , sectionDescription
    , advanceId
    , eventLocations
    , categories
    , advanceSectionJoins
) => ({id, sectionName, sectionDescription, advanceId, eventLocations, categories, advanceSectionJoins})

export const optionModel = (
    id  
    , optionName
    , categoryId
) => ({id, optionName, categoryId})

export const eventLocationModel = (
    id
    , formattedAddress
    , lat
    , lng
    , adventId
    // , optionId
) => ({id, formattedAddress, lat, lng, adventId})


