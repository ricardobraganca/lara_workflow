class tab {

    constructor(obj_tab){

        this._add_click_events( obj_tab.querySelectorAll('.menuid') ,obj_tab.querySelectorAll('.w3-bar-item') );
    }

    _add_click_events(divs, buttons){

        buttons.forEach((item, index) => {

            item.addEventListener("click", (e) => {

                e.preventDefault();
                this.set_change_tab(divs, item.innerText);
                this._default_color_tabs(buttons);
                item.classList.add("w3-gray");
            })
        });

    }

    set_change_tab(divs, text){

        divs.forEach( (item, index) => {

            if(item.id == text){

                item.style.display="block";
            }else{

                item.style.display="none";
            }
        });
    }

    _default_color_tabs(buttons){
        buttons.forEach((item, index)=>{
            item.classList.remove("w3-gray");
        });
    }

}
