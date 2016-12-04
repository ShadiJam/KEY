import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Geometry, Location } from './components'
import * as Boot from 'react-bootstrap'
import { LoginForm, RegisterForm, Login } from './login'
import { get, post, log, Error, NewRootObject } from './app'
import { CreateAdvent, AdventPage, NewAdvent } from './event'


export class Fields extends React.Component {
        constructor(){
            super()
            this.state = {
                fields: ["this", "should", "work"]
            }
        }
        
        remove(i){
            const {fields} = this.state
            
            this.setState({
                fields: fields.slice(0,i).concat(fields.slice(i+1))
            })
        }
        
        add(){
            this.setState({
                fields: this.state.fields.concat("")
            })
        }
        
        update(e, i){
            const {fields} = this.state 
            fields[i] = e.target.innerText
            this.setState({fields})
        }
        
        render(){
            const {fields} = this.state
            return <form onSubmit={e => e.preventDefault()}>
                {
                	fields.map((v,i) => <div>
                		<span 
                			contentEditable
                			className="form-field"
                			onInput={e => this.update(e, i)}
                			>{v}</span> 
                        <button onClick={e => this.remove(i)}>-</button>
                	</div>)
        		}
        		<button onClick={e => this.add()}>+</button>
            </form>
        }
    }
    
 
