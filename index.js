const enviar = require("./mailer");

const url = require("url");
const http = require("http");
const fs = require("fs");
const axios = require("axios");
const {v4 : uuidv4} = require ("uuid"); 


const server = http.createServer(async(req,res) => {
    let { correos, asunto, contenido } = url.parse(req.url, true).query
   
   const {data} = await axios("https://mindicador.cl/api")
   const template = `
   <p>El valor del ${data.dolar.codigo} el dia de hoy es:${data.dolar.valor} </p>
   <p>El valor del ${data.euro.codigo} el dia de hoy es:${data.euro.valor} </p>
   <p>El valor del ${data.uf.codigo} el dia de hoy es: ${data.uf.valor}</p>
   <p>El valor del ${data.utm.codigo} el dia de hoy es:${data.utm.valor} </p>
   `
   const id = uuidv4().slice(0,6)
   
    if(req.url.includes("/inicio")){
        res.setHeader("Content-Type","text/html")
        fs.readFile("index.html", 'utf-8', (err,data) =>{
            res.end(data)
        })
        
    }
    
    if (req.url.startsWith('/mailing')) {
        try {
            fs.writeFile(`./correos/${id}`,`
            Para : ${correos.split(",")}
            Asunto : ${asunto}
            Contenido : ${contenido} ${template}
            `,"utf-8",()=>{
                console.log("archivo creado con exito")
            })
            const respuesta = await enviar(correos.split(','), asunto, contenido + template);
            if (!respuesta.ok) return res.end(respuesta.msg);
            return res.end(respuesta.msg);
        } catch (error) {
            res.end("error de servidor");
        }
        
     
    }

    })
    
    

server.listen (3000, () => console.log("servidor activo "))