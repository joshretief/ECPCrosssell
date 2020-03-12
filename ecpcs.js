
var containerclass = document.querySelector(".srg-slider-container");
window.w = parseFloat(window.getComputedStyle(containerclass,null).getPropertyValue('width'));


var SrgSlider=SrgSlider || (function(){

	let LastWindowWidth = window.w;
	const MaxColumnsCount=6;//max number of items allowed on a slide 
	//let Position=0;
	let Pages=1;//total number of slider pages
	let Page=1;//current page of the slider
	let NumberOfElements=0;//number of slider items

	//default settings object, can be override on initing the component
	let SettingsObject={
		elementsToDisplay:4,
		showDots:true,
		dotsColor:'#d0c9c3',
		showArrows:true,
		arrowColor:'black',
		transitionEffectTime:"1s"
	}
	
	function init(settings){
		if(settings){
			SettingsObject.elementsToDisplay=settings.elementsToDisplay && settings.elementsToDisplay<=MaxColumnsCount?settings.elementsToDisplay:SettingsObject.elementsToDisplay;
			SettingsObject.showDots = typeof(settings.showDots)=="boolean"?settings.showDots:SettingsObject.showDots;
			SettingsObject.showArrows = typeof(settings.showArrows)=="boolean"?settings.showArrows:SettingsObject.showArrows;
			SettingsObject.dotsColor = typeof(settings.dotsColor)=="string"?settings.dotsColor:SettingsObject.dotsColor;
			SettingsObject.arrowColor = typeof(settings.arrowColor)=="string"?settings.arrowColor:SettingsObject.arrowColor;
			SettingsObject.transitionEffectTime = typeof(settings.arrowColor)=="string"?settings.transitionEffectTime:SettingsObject.transitionEffectTime;
		}
		
		renderSlider();
		renderArrows();
		renderDots();
		setTransitionEffectTime();
		handleResize();
	}
	
	function setTransitionEffectTime(){
		let elems=document.querySelectorAll(".srg-slider .srg-slider-item");
		let index = 0, length = elems.length;
		
		for ( ; index < length; index++) {
			let divToTranslate=document.querySelector(".srg-slider .slide-"+index);
			
			divToTranslate.style='transition-duration:'+ SettingsObject.transitionEffectTime+';';
		}											
	}
	
	
	function renderArrows(){
		//svg templates for slider arrows
		if(SettingsObject.showArrows && Pages>1){
			const leftArrow='<div class="srg-arrow slide-left" id="slideleft">'+
				'<?xml version="1.0" standalone="no"?>'+
				'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" '+
				' "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">'+
				'<svg version="1.0" xmlns="http://www.w3.org/2000/svg" '+
				'class="slider-svg" viewBox="0 0 880.000000 1061.000000" '+
				' preserveAspectRatio="xMidYMid meet">'+
				'<g transform="translate(0.000000,1061.000000) scale(0.100000,-0.100000)"'+
				'fill="#000000" stroke="transparent">'+
				'<path d="M6310 10188 c-27 -8 -451 -426 -1831 -1802 -987 -985 -2055 -2047 '+
				'-2373 -2360 -364 -359 -585 -584 -599 -610 -27 -52 -29 -152 -5 -216 15 -38 '+
				'186 -213 1050 -1076 2199 -2195 3694 -3676 3733 -3697 53 -28 164 -30 215 -3 '+
				'48 25 755 730 788 786 36 60 38 153 4 221 -17 35 -488 510 -1938 1954 l-1915 '+
				'1908 1915 1916 c1601 1602 1919 1924 1937 1965 28 65 28 148 -1 207 -27 54 '+
				'-714 748 -778 786 -49 29 -145 39 -202 21z"/>'+
				'</g>'+
				'</svg>'+
			'</div>';
			
			const rightArrow='<div class="srg-arrow slide-right" id="slideright">'+
				'<?xml version="1.0" standalone="no"?>'+
				'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"'+
				' "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">'+
				'<svg version="1.0" xmlns="http://www.w3.org/2000/svg" '+
				'class="slider-svg"'+
				 ' viewBox="0 0 880.000000 1061.000000"'+
				' preserveAspectRatio="xMidYMid meet">'+
				'<g transform="translate(0.000000,1061.000000) scale(0.100000,-0.100000)" '+
				'fill="#000000" stroke="transparent"> '+
				'<path d="M6310 10188 c-27 -8 -451 -426 -1831 -1802 -987 -985 -2055 -2047 '+
				'-2373 -2360 -364 -359 -585 -584 -599 -610 -27 -52 -29 -152 -5 -216 15 -38 '+
				'186 -213 1050 -1076 2199 -2195 3694 -3676 3733 -3697 53 -28 164 -30 215 -3 '+
				'48 25 755 730 788 786 36 60 38 153 4 221 -17 35 -488 510 -1938 1954 l-1915 '+
				'1908 1915 1916 c1601 1602 1919 1924 1937 1965 28 65 28 148 -1 207 -27 54 '+
				'-714 748 -778 786 -49 29 -145 39 -202 21z"/>'+
				'</g>'+
				'</svg>'+
			'</div>';
			
			let leftArrowContainer=document.createElement('div');
			leftArrowContainer.innerHTML=leftArrow;
			let rightArrowContainer=document.createElement('div');
			rightArrowContainer.innerHTML=rightArrow;
			
			document.querySelector(".srg-slider-container").appendChild(leftArrowContainer);
			document.querySelector(".srg-slider-container").appendChild(rightArrowContainer);
			
			let elems=document.querySelectorAll(".srg-slider .slider-svg path")
			let index = 0, length = elems.length;
		
			for ( ; index < length; index++) {
				elems[index].style="fill:" + SettingsObject.arrowColor+";";
			}
		
      document.querySelector(".srg-slider-container .srg-arrow.slide-right").addEventListener("click",slideRight);
			document.querySelector(".srg-slider-container .srg-arrow.slide-left").addEventListener("click",slideLeft);
		}
	}
	


var clickDisabled = false;
function slideRight(){
	if (clickDisabled)
  return;
  let windowWidth=window.w;

		if(Page==Pages)
		{
			Page=0;
			windowWidth=(-1)*windowWidth*(Pages-1);
		}
		
		let elems=document.querySelectorAll(".srg-slider .srg-slider-item");
		let index = 0, length = elems.length;
		
		Page++;
		setActivePage();
		
		for ( ; index < length; index++) {
			let divToTranslate=document.querySelector(".srg-slider .slide-"+index);
			let translateX=getTranslateX(divToTranslate);
			
			divToTranslate.style.transform="translate("+(translateX-windowWidth)+"px)";
		}
    clickDisabled = true;
    setTimeout(function(){clickDisabled = false;}, 1000);
    
    
	}
	
	function slideLeft(){
	if (clickDisabled)
  return;
  let windowWidth= window.w;
		if(Page==1)
		{
			Page=Pages+1;
			windowWidth=(-1)*windowWidth*(Pages-1);
		}
		
		let elems=document.querySelectorAll(".srg-slider .srg-slider-item");
		let index = 0, length = elems.length;
		
		Page--;
		setActivePage();
		
		for ( ; index < length; index++) {
			let divToTranslate=document.querySelector(".srg-slider .slide-"+index);
			let translateX=getTranslateX(divToTranslate);
			
			divToTranslate.style.transform="translate("+(translateX+windowWidth)+"px)";
		}
        clickDisabled = true;
    setTimeout(function(){clickDisabled = false;}, 1000);
	}
	
	function renderSlider(){
		let elems=document.querySelectorAll(".srg-slider .srg-slider-item");
		let index = 0, NumberOfElements = elems.length;
		
		Pages= NumberOfElements%SettingsObject.elementsToDisplay===0 ? Math.floor(NumberOfElements / SettingsObject.elementsToDisplay):Math.floor(NumberOfElements / SettingsObject.elementsToDisplay)+1;
		
		for ( ; index < NumberOfElements; index++) {
			elems[index].classList.add("elements-" + SettingsObject.elementsToDisplay);
			elems[index].classList.add("slide-" + index);
			let elementPage=(index+1)%SettingsObject.elementsToDisplay===0 ? Math.floor((index +1) / SettingsObject.elementsToDisplay):Math.floor((index+1) / SettingsObject.elementsToDisplay)+1;
			elems[index].setAttribute("data-Page",elementPage);
			
			if(index && (index+1)%SettingsObject.elementsToDisplay===1){
				elems[index].classList.add("adjust-position");
				elems[index].classList.add("adjust-position-"+SettingsObject.elementsToDisplay+"-page-"+elementPage);
			}
		}
	}
	
	function getTranslateX(element) {
	  //returns the translateX value of an container
	  var style = window.getComputedStyle(element);
	  var matrix = new WebKitCSSMatrix(style.webkitTransform);
	  
	  return matrix.m41;
	}
	
	function handleResize(){
		window.addEventListener("resize",function(){
			if(window.w!=LastWindowWidth){
				LastWindowWidth=window.w;
				Page=1;
				let elems=document.querySelectorAll(".srg-slider .srg-slider-item");
				let index = 0, length = elems.length;
				
				for ( ; index < length; index++) {
					let divToTranslate=document.querySelector(".srg-slider .slide-"+index);
					divToTranslate.style.transform="translate("+0+"px)";
				}
				
				resetPage();
			}
			
		});
	}
	
	function renderDots(){
		if(SettingsObject.showDots && Pages>1){
			let dotsContainer='<div class="srg-slider-dots">'+
				'<span class="dot active" data-Page="1"></span>';
				
			let index=1;
			
			for( ; index<Pages;index++){
				dotsContainer+='<span class="dot" data-Page="'+(index+1)+'"></span>';
				
			}
			
			dotsContainer+='</div>';	
			
			let divElement=document.createElement('div');
			divElement.innerHTML=dotsContainer;
			
			document.querySelector(".srg-slider-container").appendChild(divElement);
			
			let elems=document.querySelectorAll(".srg-slider-container .dot")
			let index2 = 0, length = elems.length;
		
			for ( ; index2 < length; index2++) {
				elems[index2].addEventListener("click",selectPage);
				elems[index2].style.backgroundColor=SettingsObject.dotsColor;
			}
		}
	}
	
	function setActivePage(){
		let elems=document.querySelectorAll(".srg-slider-container .dot")
		let index = 0, length = elems.length;
	
		for ( ; index < length; index++) {
			if(elems[index].classList.contains("active")){
				elems[index].classList.remove("active");
			}
			
			if(index+1===Page){
				elems[index].classList.add("active");
			}
		}
	}
	
	function selectPage(){
		let elems=document.querySelectorAll(".srg-slider-container .dot")
		let index = 0, length = elems.length;
	
		for ( ; index < length; index++) {
			if(elems[index].classList.contains("active")){
				elems[index].classList.remove("active");
			}
		}
		
		this.classList.add("active");
		
		let elementPage=+this.getAttribute("data-Page");
		if(elementPage!=Page){
			let windowWidth=window.w;
			let multiplier=Page-elementPage;
			let translateXValue=windowWidth * multiplier;
			
			let elems=document.querySelectorAll(".srg-slider .srg-slider-item");
			let index = 0, length = elems.length;
			
			Page=elementPage;
			
			for ( ; index < length; index++) {
				let divToTranslate=document.querySelector(".srg-slider .slide-"+index);
				
				let translateX=getTranslateX(divToTranslate);
				
				divToTranslate.style.transform="translate("+(translateX+translateXValue)+"px)";
			}
		}
		
	}
	
	function resetPage(){
		let elems=document.querySelectorAll(".srg-slider-container .dot")
		let index = 0, length = elems.length;
	
		for ( ; index < length; index++) {
			if(elems[index].classList.contains("active")){
				elems[index].classList.remove("active");
			}
			
			if(index===0){
				elems[index].classList.add("active");
			}
		}
	}
	
	return {
		init:init
	}
}())
