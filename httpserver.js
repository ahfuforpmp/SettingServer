
var fs=require('fs');
var http = require('http');

var port = 10001;
var file= __dirname + "/main.json";
var contentText = fs.readFileSync(file);
var main_content =JSON.parse(contentText);
var content_trunk = new Map();

function handle_respone(request, response, port){
	  console.log('--------recevice port %d-------', port)
	  console.log(request.url)

	  const { headers, method, url } = request;
	  let body = [];
	  request.on('error', (err) => {
	    console.error(err);
	  }).on('data', (chunk) => {
	    body.push(chunk);
	  }).on('end', () => {
	    body = Buffer.concat(body).toString();
	    console.log(body)
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end(contentText);
	  });
}

start_server()
 
function start_server(){
	console.log('--------Current Information begin -------')
	console.log("执行路径:" + process.execPath)
	console.log("文件路径:" + __dirname)
	console.log("端口:" + port)
	console.log("Json位置:" + file)
	console.log(main_content)
	for(let i = 0, len = main_content.max_index; i <= len; i++) {
		//console.log('--------beign trunk %d-------', i)
		var trunk_path = __dirname + "/trunk_" + i + ".json";
		var trunk = fs.readFileSync(trunk_path);
		var trunk_content =JSON.parse(trunk);
		content_trunk.set(i, trunk_content);
		//console.log(trunk_content);
		//console.log('--------end trunk %d-------', i)
 	}
 	//console.log(content_trunk);
	console.log('--------Current Information end -------')

 	http.createServer(function (request, response) {
 		handle_respone(request, response, port);
	}).listen(port);

	console.log('--------create http server at http://127.0.0.1:%d/-------', port)
}



