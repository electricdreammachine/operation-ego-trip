import { pipe, reduce, path, find, pathEq, filter } from 'ramda'

const transformQueryToDomain = (data) => {
    const files = path(['allFiles', 'fileDefintions'], data)

    const expandedJSONData = pipe(
        filter(pathEq(['node', 'extension'], 'json'))
    )(files)

    console.log(expandedJSONData)
    // console.log(reshaped)
}

export default transformQueryToDomain