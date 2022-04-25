import React from "react";
import { Component } from "react";
import BarInfo from "./BarInfo";
import ListMessage from "./ListMessage";
import NavBar from "./NavBar";
import PostMessage from "./PostMessage";
import Profil from "./Profil"
import profil1 from "./img/profil1.png"
import profil2 from "./img/profil2.png"
import profil3 from "./img/profil3.png"
import profil4 from "./img/profil4.png"
import profil5 from "./img/profil5.png"
import profil6 from "./img/profil6.png"
import profil7 from "./img/profil7.png"
import profil8 from "./img/profil8.jpeg"
import "./Twall.css"
import axios from "axios";
axios.defaults.withCredentials = true;

class Twall extends Component{
    constructor(props){
        super(props)
        this.goToProfil = this.goToProfil.bind(this)
        this.goToTwall = this.goToTwall.bind(this)
        this.state = {page : 'Twall',key : 0}
        this.profil = this.profil.bind(this)
        this.goToFind = this.goToFind.bind(this)
        this.edit = this.edit.bind(this)
        this.valider = this.valider.bind(this)
        this.select = this.select.bind(this)
    }
    goToProfil(login){
        this.setState({page : 'profil',login : login,key : this.state.key + 1,keyword : undefined})

    }

    goToFind(msg){
        this.setState({page : "Twall",keyword : msg})
    }
    goToTwall(){
        this.setState({page : 'Twall',keyword : undefined})
    }

    profil(){
        return <div className="twallContener">
            <div className="GaucheWALL">
                <ListMessage key={this.state.keyword + this.props.login} find={this.state.keyword} goToProfil={this.goToProfil}/>
            </div>
            <div className="DroiteWALL">
                <PostMessage/>
            </div>
            </div>
    }

    isProfil(){
        if (this.state.page === 'profil'){
            console.log(this.state.key)
            return <Profil key={this.state.login + this.state.key} login={this.state.login} goToProfil={this.goToProfil} edit={this.edit}/>
        }
        else return this.profil()
    }

    edit(){
        document.getElementById("EDIT").style.visibility = "visible"
    }

    valider(){
        document.getElementById("toColor").style.zIndex = 0
        document.getElementById("EDIT").style.visibility = "hidden"

        var res = -1
        for (let i = 1 ; i < 9 ; i++ ){
            if (document.getElementById(String(i)).style.border != ""){
                res = i
            }
            document.getElementById(String(i)).style.border = ""
        }

        if (res == -1) return

        const info = {
            pp : res
        }
        axios.post("http://localhost:4000/api/pp/user",info,{withCredentials : true})
        .then((res) => {
            console.log(res)
            this.goToProfil(this.props.login)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    select(id){

        for (let i = 1 ; i < 9 ; i++ ){
            document.getElementById(String(i)).style.border = ""
        }

        document.getElementById(id).style.border = "solid"
        document.getElementById(id).style.borderColor = "rgba(245, 2, 2, 0.438)"
    }
    render(){
        return <div class="parentTwall">
        <div class="div1Twall"> 
            <BarInfo logout={this.props.logout} login={this.props.login} goToProfil={this.goToProfil} goToTwall={this.goToTwall}/>
        </div>
        <div class="div2Twall"> 
            <NavBar find={this.goToFind}/>
        </div>
        <div id="valider" class="div3Twall"> 
            {this.isProfil()}          
        </div>
        <div id="EDIT" class="div4Twall"> 
            <img id="1" className="imgPicEdit" src={profil1} onClick={() => this.select("1")}/>
            <img id="2" className="imgPicEdit" src={profil2} onClick={() => this.select("2")}/>
            <img id="3" className="imgPicEdit" src={profil3} onClick={() => this.select("3")}/>
            <img id="4" className="imgPicEdit" src={profil4} onClick={() => this.select("4")}/>
            <img id="5" className="imgPicEdit" src={profil5} onClick={() => this.select("5")}/>
            <img id="6" className="imgPicEdit" src={profil6} onClick={() => this.select("6")}/>
            <img id="7" className="imgPicEdit" src={profil7} onClick={() => this.select("7")}/>
            <img id="8" className="imgPicEdit" src={profil8} onClick={() => this.select("8")}/>
            <div className="contenerBEdit">
                <button id="bEDIT" className="bn39" onClick={() => this.valider()}><span class="bn39span">Valider</span></button>
            </div>
        </div>
        </div> 
    }
}
export default Twall