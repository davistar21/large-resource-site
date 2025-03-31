const $ = (className, src=document, all=false) => {
  if (all == true) {
    return src.querySelectorAll(className)
  }
  return src.querySelector(className)
}


export default $