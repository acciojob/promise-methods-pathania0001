function myRace(promises) {
    return new Promise((resolve,reject)=>{
	  let isResolved = false;
	  promises.forEach((promise)=>{
		  Promise.resolve(promise).then((data) =>{
				  if(!isResolved){
					  isResolved = true;
					  resolve(data);
				  }}).catch((error)=>{
				  if(!isResolved){
					  isResolved = true;
					  reject(error);
				  }})
	  })
  })
}
function myAny(promises) {
  return new Promise((resolve,reject)=>{
    if(promises.length === 0)
		reject(promises);
	  let count = 0;
	  const isAllRejected = Array(promises.length);

	  promises.forEach((promise,index)=>{
		  Promise.resolve(promise)
			  .then( data => resolve(data))
			  .catch((error)=>{
			  isAllRejected[index] = error;
				 count++;
				  if(count === promises.length)
					  reject(new AggregateError(rejectedErrors, "All promises were rejected"));
		  })
	  })
  })
}

function myAll(promises) {
  return new Promise ((resolve,reject)=>{
	  if(promises.length===0)
	   resolve(promises);
	  let isAllResolved = Array(promises.length);
	  let count = 0;
	  promises.forEach((promise,idx)=>{
		  Promise.resolve(promise).then((data)=>{
			  isAllResolved[idx] = data;
			  count++;
			  if(count === promises.length)
				  resolve(isAllResolved)
		  }).catch((error)=>{
			  reject(error);
		  })
	  })
  })
}

function myAllSettled(promises) {
  return new Promise((resolve,reject)=>{
	  if(promises.length===0)
	   resolve(promises);
      const isAllResolved = Array(promises.length);
	  let count = 0;
	  promises.forEach((promise,index)=>{
		  Promise.resolve(promise).then((data)=>{
			  count++;
			  isAllResolved[index] = {status:"fullfilled",value:data};
			  if(count === promises.length)
				  resolve(isAllResolved);
		  }).catch((error)=>{
			  count++;
			  isAllResolved[index] = {status:"rejected",value:error};
			  if(count === promises.length)
				  resolve(isAllResolved);
		  })
	  })
  })
}

module.exports = {
  myRace,
  myAny,
  myAll,
  myAllSettled
};
