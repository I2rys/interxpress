"use strict";

// Variables
let mung = {}

// Functions
function isScalar(v) {
    return typeof v !== "object" && !Array.isArray(v)
}

// Main
mung.onError = (err, req, res, next) =>{
    res.status(500).set("content-language", "en").json({ message: err.message }).end()

    return res
}

mung.json = function json (fn, options){
    return function(req, res, next){
        let original = res.json
        options = options || {}

        let mungError = options.mungError

        function json_hook(json){
            let originalJson = json
            res.json = original

            if(res.headersSent) return res
            if(!mungError && res.statusCode >= 400) return original.call(this, json)

            try{
                json = fn(json, req, res)
            }catch(e){
                return mung.onError(e, req, res, next)
            }

            if(res.headersSent) return res

            if(json === undefined) json = originalJson;
            if(json === null) return res.status(204).end()

            if(originalJson !== json && isScalar(json)){
                res.set("content-type", "text/plain")

                return res.send(String(json))
            }

            return original.call(this, json)
        }

        res.json = json_hook

        next && next()
    }
}

mung.send = function send(fn, options){
    return function(req, res, next){
        let original = res.send
        options = options || {}

        let mungError = options.mungError

        function json_hook(json){
            let originalJson = json
            res.send = original

            if(res.headersSent) return res
            if(!mungError && res.statusCode >= 400) return original.call(this, json)


            try{
                json = fn(json, req, res)
            }catch(e){
                return mung.onError(e, req, res, next)
            }

            if(res.headersSent) return res
            if(json === undefined) json = originalJson
            if(json === null) return res.status(204).end()

            return original.call(this, json)
        }

        res.send = json_hook

        next && next()
    }
}

module.exports = mung