exports.addDefaultValues = function (obj) {
    const withDefaultValues = {...obj};


    // add secure field at the root level
    if (withDefaultValues.hasOwnProperty('forms')) {
        for (let item in withDefaultValues.forms) {
            if(!item.hasOwnProperty('secure')) {
                withDefaultValues.forms[0].secure = withDefaultValues.security[0]
            }
        }
    }

    // add secure field to the properties level in forms
    for (let item in withDefaultValues.properties) {
        const checkIfPropertyExist = withDefaultValues.properties[item].hasOwnProperty('forms');
        if (checkIfPropertyExist) {
            for (let key in withDefaultValues.properties[item].forms) {
                let isSecureExist = !withDefaultValues.properties[item].forms[key].hasOwnProperty('secure');
                if(isSecureExist) {
                    withDefaultValues.properties[item].forms[key].secure = withDefaultValues.security[0]
                }
            }
        }
    }

    // add observable field to the properties
    for (let item in withDefaultValues.properties) {
        const checkIfPropertyExist = withDefaultValues.properties[item].hasOwnProperty('observable');
        if (!checkIfPropertyExist) {
            withDefaultValues.properties[item].observable = false;
        }
    }

    // add writeOnly field to the properties
    for (let item in withDefaultValues.properties) {
        const checkIfPropertyExist = withDefaultValues.properties[item].hasOwnProperty('writeOnly');
        if (!checkIfPropertyExist) {
            withDefaultValues.properties[item].writeOnly = false;
        }
    }

    return withDefaultValues;
};