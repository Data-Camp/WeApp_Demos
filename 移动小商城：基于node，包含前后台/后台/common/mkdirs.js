import fs from 'fs'
import path from 'path'

// 创建多层文件夹 同步
function mkdirsSync(dirpath, mode) {
	if (!fs.existsSync(dirpath)) {
        let pathtmp
        dirpath.split(path.sep).forEach(dirname => {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname)
            } else {
                pathtmp = dirname
            }

            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false
                }
            }
        })
    }
    return true
}

// 创建多层文件夹 异步
function mkdirs(dirpath, mode, callback) {
    callback = callback || function() {}
    fs.exists(dirpath, exitsmain => {
        if (!exitsmain) {
            //目录不存在
            let pathtmp
            let pathlist = dirpath.split(path.sep)
            let pathlistlength = pathlist.length
            let pathlistlengthseed = 0

            mkdir_auto_next(mode, pathlist, pathlist.length, callresult => {
                if (callresult) {
                    callback(true)
                } else {
                    callback(false)
                }
            })
        } else {
            callback(true)
        }
    })
}

// 异步文件夹创建 递归方法
function mkdir_auto_next(mode, pathlist, pathlistlength, callback, pathlistlengthseed, pathtmp) {
    callback = callback || function() {}
    if (pathlistlength > 0) {

        if (!pathlistlengthseed) {
            pathlistlengthseed = 0
        }

        if (pathlistlengthseed >= pathlistlength) {
            callback(true)
        } else {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, pathlist[pathlistlengthseed])
            } else {
                pathtmp = pathlist[pathlistlengthseed]
            }

            fs.exists(pathtmp, exists => {
                if (!exists) {
                    fs.mkdir(pathtmp, mode, isok => {
                        if (!isok) {
                            mkdir_auto_next(mode, pathlist, pathlistlength, callresult => {
                                callback(callresult)
                            },
                            pathlistlengthseed + 1, pathtmp)
                        } else {
                            callback(false)
                        }
                    })
                } else {
                    mkdir_auto_next(mode, pathlist, pathlistlength, callresult => {
                        callback(callresult)
                    },
                    pathlistlengthseed + 1, pathtmp)
                }
            })
        }
    } else {
        callback(true)
    }
}

export default {
    mkdirsSync: mkdirsSync, 
    mkdirs: mkdirs, 
}