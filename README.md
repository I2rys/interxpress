# Interxpress
Intercept express.js responses before It get sent.

## Installation
Github:
```
git clone https://github.com/I2rys/interxpress
```

NpmJS:
```
npm i interxpress
```

## Usage
Intercept send:
```
web.use(interxpress.send((body, req, res)=>{
    console.log(body)
}))
```

Intercept json:
```
web.use(interxpress.json((body, req, res)=>{
    console.log(body)
}))
```

## License
MIT © I2rys