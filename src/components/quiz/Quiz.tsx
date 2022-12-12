import { useEffect, useRef, useState } from 'react'
import subject from '../../images/subject.png';
import predicate from '../../images/predicate.png';
import preposition from '../../images/preposition.png';
import object from '../../images/object.png';
import modifier from '../../images/modifier.png';
import object_2 from '../../images/object-kindof.png'
import {select, Selection} from 'd3-selection'
import { ArrowUturnLeftIcon, ArrowUturnRightIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { v4 } from 'uuid'
import * as d3 from 'd3';
import { line } from 'd3';

type lineObject = {
  type: string | null,
  text: string | null,
  parent: string | null,
}

type modifierObject = {
  word: string | null,
  modifier: modifierObject[]
}

type modelObject = {
  subject: {
    word: string | null,
    modifier: modifierObject[]
  },
  predicate: {
    word: string | null,
    modifier: modifierObject[]
  },
  object: {
    word: string | null,
    modifier: modifierObject[]
    }
  }
type canvas = {
  sentence : string | null,
  linesArr : lineObject[],
  lastDrawn : lineObject[]
}

let data = [
  {
    "sentence" : "The young tree grew quickly",
    "type" : "simple", 
  },
  {
    "sentence" : "The turtles travelled enthusiastically",
    "type" : "simple", 
  },
  {
    "sentence" : "The fox greeted the mouse",
    "type" : "simple", 
  },
  
]

let initialLines: lineObject[] = []
let lastDrawn : lineObject[] = []
let canvasDrawings: canvas[] = []
let index = 0;

const Quiz = () => {

    const [svgselect, setSvgselect] = useState<null | Selection<null, unknown, null, undefined>>(null);
    const [lines, setLines] = useState(initialLines);
    const [selected, setSelected] = useState<string | null>(null);
    const [canvases, setCanvases] = useState(null)
    const svgRef = useRef(null);     

    useEffect(()=>{
      let modifier_x = {
        subject: 0,
        predicate: 0,
        object: 0,
        s_length: 0,
        p_length: 0
      };

      let model: modelObject = {
        "subject": {
          "word" : "",
          "modifier": []
        },
        "predicate":{
          "word" : "",
          "modifier": []
        },
        "object":{
          "word" : "",
          "modifier": []
        }
      }

      if(!svgselect){
        setSvgselect(d3.select(svgRef.current));
      } else {
        const draggables = document.querySelectorAll(".draggable");
        let dragged : string | null = null;

        draggables.forEach(element => {
          element.addEventListener("dragstart", (e)=>{
            dragged = element.innerHTML;
            d3.selectAll('rect')
            .attr("stroke", "black")
            .attr("stroke-width", "2px")

            console.log(dragged);
          })

          element.addEventListener("dragend", (e)=>{
            dragged = element.innerHTML;
            d3.selectAll('rect')
            .attr("stroke", "white")
            console.log(dragged);
          })
        });

        svgselect.selectAll("svg > *").remove();

        console.log(svgselect)
        console.log(lines)
        
          lines.forEach(l => {
            if(l.type === 'subject'){
              svgselect.append('g')
                .attr("id", "subject-drop")
                .append("rect")
                .attr("id", "subject-drop-rect")
                .attr("fill", "white")
                .attr("width", 100)
                .attr("height", 40)
                .attr("x", 150)
                .attr("y", 100)
                .on("dragover", (ev) => {
                  ev.preventDefault();
                })
                .on("drop", ()=>{
                  select('#subject-drop > text').remove()

                  l.text = dragged;
                  select('#subject-drop')
                  .append('text')
                  .text(dragged)
                  .attr("font-size", "24px")
                  .attr("stroke", "black")
                  .attr("x", 200)
                  .attr("y", 120)
                  .attr("dominant-baseline", "middle")
                  .attr("text-anchor", "middle")

                  select('#subject-drop-rect')
                  .attr("fill", "white")


                  // setLines(lines.splice(lines.lastIndexOf(lines.find()), 1, {type: "subject", text: dragged, parent: null}))
                  l.text = dragged;

                  model.subject.word = l.text
                })

                if(l.text !== null){
                  select('#subject-drop > text').remove()
                  select('#subject-drop')
                  .append('text')
                  .text(l.text)
                  .attr("font-size", "24px")
                  .attr("stroke", "black")
                  .attr("x", 200)
                  .attr("y", 120)
                  .attr("dominant-baseline", "middle")
                  .attr("text-anchor", "middle")

                  select('#subject-drop-rect')
                  .attr("fill", "white")

                  model.subject.word = l.text
                }
  
              svgselect.append('line')
              .attr("id", "subject-line")
                .attr('x1', 100)
                .attr('y1', 150)
                .attr('x2', 300)
                .attr('y2', 150)
                .attr('stroke', 'black')
                .attr('stroke-width', '4px')
                .on("click", (ev) => {
                  // ev.preventDefault()
                  if(selected !== "subject"){
                    setSelected("subject");
                    select('#subject-line').attr("stroke", "blue");
                    console.log("Ha")
                  } else {
                    setSelected(null);
                    select('#subject-line').attr("stroke", "black");
                    console.log("Ho")
                  }
                  console.log("clicked!")
                  console.log(selected)
                  
                })

                if(selected === "subject"){
                  select('#subject-line').attr("stroke", "blue");
                } else {
                  select('#subject-line').attr("stroke", "black");
                }
                
  
            } else if (l.type === "predicate"){
              svgselect.append('g')
                .attr("id", "predicate-drop")
                .append("rect")
                .attr("id", "predicate-drop-rect")
                .attr("fill", "white")
                .attr("width", 100)
                .attr("height", 40)
                .attr("x", 350)
                .attr("y", 100)
                .on("dragover", (ev) => {
                  ev.preventDefault();
                })
                .on("drop", ()=>{
                  select('#predicate-drop > text').remove()

                  select('#predicate-drop')
                  .append('text')
                  .text(dragged)
                  .attr("font-size", "24px")
                  .attr("stroke", "black")
                  .attr("x", 400)
                  .attr("y", 120)
                  .attr("dominant-baseline", "middle")
                  .attr("text-anchor", "middle")

                  select('#predicate-drop-rect')
                  .attr("fill", "white")

                  // setLines(lines.splice(lines.length-1, 1, {type: "predicate", text: dragged, parent: null}))
                  l.text = dragged;

                  model.predicate.word = l.text
                })

                if(l.text !== null){
                  select('#predicate-drop > text').remove()

                  select('#predicate-drop')
                  .append('text')
                  .text(l.text)
                  .attr("font-size", "24px")
                  .attr("stroke", "black")
                  .attr("x", 400)
                  .attr("y", 120)
                  .attr("dominant-baseline", "middle")
                  .attr("text-anchor", "middle")

                  select('#predicate-drop-rect')
                  .attr("fill", "white")

                  model.predicate.word = l.text
                }
  
              svgselect.append('line')
                .attr("id", "predicate-line")
                .attr('x1', 300)
                .attr('y1', 150)
                .attr('x2', 500)
                .attr('y2', 150)
                .attr('stroke', 'black')
                .attr('stroke-width', '4px')
                .on("click", (ev) => {
                  // ev.preventDefault()
                  if(selected !== "predicate"){
                    setSelected("predicate");
                    select('#predicate-line').attr("stroke", "blue");
                  } else {
                    setSelected(null);
                    select('#predicate-line').attr("stroke", "black");
                  }
                  console.log("clicked!")
                  console.log(selected)
                  
                })

                if(selected === "predicate"){
                  select('#predicate-line').attr("stroke", "blue");
                } else {
                  select('#predicate-line').attr("stroke", "black");
                }
  
              svgselect.append('line')
                .attr('x1', 300)
                .attr('y1', 100)
                .attr('x2', 300)
                .attr('y2', 180)
                .attr('stroke', 'black')
                .attr('stroke-width', '4px');

            } else if(l.type === 'modifier'){
                if(l.parent === 'subject'){
                  let group_id :any
                  let rect_id : any
                  let inc_x: any

                  if(modifier_x.s_length === 0){
                    group_id = `modifier-drop-0`;
                    rect_id = `modifier-drop-rect-0`
                    inc_x = 0
                  } else if (modifier_x.s_length == 1){
                    group_id = `modifier-drop-1`;
                    rect_id = `modifier-drop-rect-1`
                    inc_x = inc_x = 100
                  }
                  svgselect.append('g')
                    .attr("id", group_id)
                    .append("rect")
                    .attr("id", rect_id)
                    .attr("fill", "white")
                    .attr("width", 100)
                    .attr("height", 40)
                    .attr("transform", `translate(${180 + inc_x}, ${160}), rotate(45)`)
                    .on("dragover", (ev) => {
                      ev.preventDefault();
                    })
                    .on("drop", ()=>{
                      select(`${group_id} > text`).remove()

                      console.log("THIS: " + group_id)

                      select(`#${group_id}`)
                      .append('text')
                      .text(dragged)
                      .attr("font-size", "18px")
                      .attr("stroke", "black")
                      .attr("transform", `translate(${180 + inc_x}, ${200}), rotate(45)`)
                      .attr("dominant-baseline", "middle")
                      .attr("text-anchor", "middle")

                      select(`#${rect_id}`)
                      .attr("fill", "white")

                      l.text = dragged;
                      let modObject: modifierObject = {
                        word: l.text,
                        modifier: []
                      }
                      model.subject.modifier.push(modObject)
                    })

                    if(l.text !== null){
                      select(`#${group_id} > text`).remove()

                      select(`#${group_id}`)
                      .append('text')
                      .text(l.text)
                      .attr("font-size", "18px")
                      .attr("stroke", "black")
                      .attr("transform", `translate(${180 + inc_x}, ${200}), rotate(45)`)
                      .attr("dominant-baseline", "middle")
                      .attr("text-anchor", "middle")

                      select(`#${rect_id}`)
                      .attr("fill", "white")

                      let modObject: modifierObject = {
                        word: l.text,
                        modifier: []
                      }
                      model.subject.modifier.push(modObject)
                    }

      
                  svgselect.append('line')
                    .attr('x1', 100 + inc_x)
                    .attr('y1', 150)
                    .attr('x2', 200 + inc_x)
                    .attr('y2', 250)
                    .attr('stroke', 'black')
                    .attr('stroke-width', '4px')

                  modifier_x.subject+= 100;
                  modifier_x.s_length++;



                } else if(l.parent === 'predicate'){
                  let group_id :any
                  let rect_id : any
                  let inc_x: any
                  
                  if(modifier_x.p_length === 0){
                    group_id = `modifier-drop-3`;
                    rect_id = `modifier-drop-rect-3`
                    inc_x = 0
                  } else if (modifier_x.p_length == 1){
                    group_id = `modifier-drop-4`;
                    rect_id = `modifier-drop-rect-4`
                    inc_x = 100
                  }
                  svgselect.append('g')
                    .attr("id", group_id)
                    .append("rect")
                    .attr("id", rect_id)
                    .attr("fill", "white")
                    .attr("width", 100)
                    .attr("height", 40)
                    .attr("transform", `translate(${380 + inc_x}, ${160}), rotate(45)`)
                    .on("dragover", (ev) => {
                      ev.preventDefault();
                    })
                    .on("drop", ()=>{
                      select(`#${group_id} > text`).remove()

                      console.log("THIS: " + group_id)

                      select(`#${group_id}`)
                      .append('text')
                      .text(dragged)
                      .attr("font-size", "18px")
                      .attr("stroke", "black")
                      .attr("transform", `translate(${380 + inc_x}, ${200}), rotate(45)`)
                      .attr("dominant-baseline", "middle")
                      .attr("text-anchor", "middle")

                      select(`#${rect_id}`)
                      .attr("fill", "white")

                      l.text = dragged;
                      let modObject: modifierObject = {
                        word: l.text,
                        modifier: []
                      }
                      model.subject.modifier.push(modObject)
                    })

                    if(l.text !== null){
                      select(`#${group_id} > text`).remove()

                      select(`#${group_id}`)
                      .append('text')
                      .text(l.text)
                      .attr("font-size", "18px")
                      .attr("stroke", "black")
                      .attr("transform", `translate(${380 + inc_x}, ${200}), rotate(45)`)
                      .attr("dominant-baseline", "middle")
                      .attr("text-anchor", "middle")

                      select(`#${rect_id}`)
                      .attr("fill", "white")

                      let modObject: modifierObject = {
                        word: l.text,
                        modifier: []
                      }
                      model.predicate.modifier.push(modObject)
                    }
      
                  svgselect.append('line')
                    .attr('x1', 300 + inc_x)
                    .attr('y1', 150)
                    .attr('x2', 400 + inc_x)
                    .attr('y2', 250)
                    .attr('stroke', 'black')
                    .attr('stroke-width', '4px')

                    modifier_x .predicate+= 100;
                    modifier_x.p_length++;

                } else if(l.parent === 'object' || l.parent ==='object_2'){
                  let group_id :any
                  let rect_id : any
                  let inc_x: any

                  if(modifier_x.s_length === 0){
                    group_id = `modifier-drop-4`;
                    rect_id = `modifier-drop-rect-5`
                    inc_x = 0
                  } else if (modifier_x.s_length == 1){
                    group_id = `modifier-drop-4`;
                    rect_id = `modifier-drop-rect-5`
                    inc_x = inc_x = 100
                  }
                  svgselect.append('g')
                    .attr("id", group_id)
                    .append("rect")
                    .attr("id", rect_id)
                    .attr("fill", "white")
                    .attr("width", 100)
                    .attr("height", 40)
                    .attr("transform", `translate(${590 + inc_x}, ${160}), rotate(45)`)
                    .on("dragover", (ev) => {
                      ev.preventDefault();
                    })
                    .on("drop", ()=>{
                      select(`${group_id} > text`).remove()

                      console.log("THIS: " + group_id)

                      select(`#${group_id}`)
                      .append('text')
                      .text(dragged)
                      .attr("font-size", "18px")
                      .attr("stroke", "black")
                      .attr("transform", `translate(${590 + inc_x}, ${200}), rotate(45)`)
                      .attr("dominant-baseline", "middle")
                      .attr("text-anchor", "middle")

                      select(`#${rect_id}`)
                      .attr("fill", "white")

                      l.text = dragged;
                      let modObject: modifierObject = {
                        word: l.text,
                        modifier: []
                      }
                      model.subject.modifier.push(modObject)
                    })

                    if(l.text !== null){
                      select(`#${group_id} > text`).remove()

                      select(`#${group_id}`)
                      .append('text')
                      .text(l.text)
                      .attr("font-size", "18px")
                      .attr("stroke", "black")
                      .attr("transform", `translate(${590 + inc_x}, ${200}), rotate(45)`)
                      .attr("dominant-baseline", "middle")
                      .attr("text-anchor", "middle")

                      select(`#${rect_id}`)
                      .attr("fill", "white")

                      let modObject: modifierObject = {
                        word: l.text,
                        modifier: []
                      }
                      model.subject.modifier.push(modObject)
                    }

      
                  svgselect.append('line')
                    .attr('x1', 510 + inc_x)
                    .attr('y1', 150)
                    .attr('x2', 610 + inc_x)
                    .attr('y2', 250)
                    .attr('stroke', 'black')
                    .attr('stroke-width', '4px')

                  modifier_x.subject+= 100;
                  modifier_x.s_length++;
                } else if(l.parent === 'preposition'){

                }

            } else if(l.type === 'object_2'){
              svgselect.append('g')
              .attr('id', "object_2-drop")
              .append('rect')
              .attr("id", "object_2-drop-rect")
                .attr("fill", "white")
                .attr("width", 100)
                .attr("height", 40)
                .attr("x", 520)
                .attr("y", 100)
                .on("dragover", (ev) => {
                  ev.preventDefault();
                })
                .on("drop", ()=>{
                  select('#object_2-drop > text').remove()

                  select('#object_2-drop')
                  .append('text')
                  .text(dragged)
                  .attr("font-size", "24px")
                  .attr("stroke", "black")
                  .attr("x", 600)
                  .attr("y", 120)
                  .attr("dominant-baseline", "middle")
                  .attr("text-anchor", "middle")

                  select('#object_2-drop-rect')
                  .attr("fill", "white")

                  // setLines(lines.splice(lines.length-1, 1, {type: "object_2", text: dragged, parent: null}))
                  l.text = dragged;

                  model.object.word = l.text
                })

                if(l.text !== null){
                  select('#object_2-drop > text').remove()

                  select('#object_2-drop')
                  .append('text')
                  .text(l.text)
                  .attr("font-size", "24px")
                  .attr("stroke", "black")
                  .attr("x", 600)
                  .attr("y", 120)
                  .attr("dominant-baseline", "middle")
                  .attr("text-anchor", "middle")

                  select('#predicate-drop-rect')
                  .attr("fill", "white")

                  model.object.word = l.text
                }



  
              svgselect.append('line')
              .attr("id", "object_2-line")
                .attr('x1', 500)
                .attr('y1', 150)
                .attr('x2', 700)
                .attr('y2', 150)
                .attr('stroke', 'black')
                .attr('stroke-width', '4px')
                .on("click", (ev) => {
                  // ev.preventDefault()
                  if(selected !== "object_2"){
                    setSelected("object_2");
                    select('#object_2-line').attr("stroke", "blue");
                  } else {
                    setSelected(null);
                    select('#object_2-line').attr("stroke", "black");
                    console.log("Ho")
                  }
                  console.log("clicked!")
                  console.log(selected)
                  
                })

  
              svgselect.append('line')
                .attr('x1', 460)
                .attr('y1', 100)
                .attr('x2', 500)
                .attr('y2', 150)
                .attr('stroke', 'black')
                .attr('stroke-width', '4px')
                
                if(selected === "object_2"){
                  select('#object_2-line').attr("stroke", "blue");
                } else {
                  select('#object_2-line').attr("stroke", "black");
                };


            } else if(l.type === 'object'){
              svgselect.append('g')
              .attr('id', "object-drop")
              .append('rect')
              .attr("id", "object-drop-rect")
                .attr("fill", "white")
                .attr("width", 100)
                .attr("height", 40)
                .attr("x", 520)
                .attr("y", 100)
                .on("dragover", (ev) => {
                  ev.preventDefault();
                })
                .on("drop", ()=>{
                  select('#object-drop > text').remove()

                  select('#object-drop')
                  .append('text')
                  .text(dragged)
                  .attr("font-size", "24px")
                  .attr("stroke", "black")
                  .attr("x", 600)
                  .attr("y", 120)
                  .attr("dominant-baseline", "middle")
                  .attr("text-anchor", "middle")

                  select('#object-drop-rect')
                  .attr("fill", "white")

                  // setLines(lines.splice(lines.length-1, 1, {type: "object", text: dragged, parent: null}))
                  l.text = dragged;

                  model.object.word = l.text
                })

                if(l.text !== null){
                  select('#object-drop > text').remove()

                  select('#object-drop')
                  .append('text')
                  .text(l.text)
                  .attr("font-size", "24px")
                  .attr("stroke", "black")
                  .attr("x", 600)
                  .attr("y", 120)
                  .attr("dominant-baseline", "middle")
                  .attr("text-anchor", "middle")

                  select('#predicate-drop-rect')
                  .attr("fill", "white")

                  model.object.word = l.text
                }
  
              svgselect.append('line')
              .attr("id", "object-line")
                .attr('x1', 500)
                .attr('y1', 150)
                .attr('x2', 700)
                .attr('y2', 150)
                .attr('stroke', 'black')
                .attr('stroke-width', '4px')
                .on("click", (ev) => {
                  // ev.preventDefault()
                  if(selected !== "object"){
                    setSelected("object");
                    select('#object-line').attr("stroke", "blue");
                    console.log("Ha")
                  } else {
                    setSelected(null);
                    select('#object-line').attr("stroke", "black");
                    console.log("Ho")
                  }
                  console.log("clicked!")
                  console.log(selected)
                  
                })
  
              svgselect.append('line')
                .attr('x1', 500)
                .attr('y1', 100)
                .attr('x2', 500)
                .attr('y2', 150)
                .attr('stroke', 'black')
                .attr('stroke-width', '4px')
                

                if(selected === "object"){
                  select('#object-line').attr("stroke", "blue");
                } else {
                  select('#object-line').attr("stroke", "black");
                };;
            }else if(l.type === 'preposition'){

              svgselect.append('rect')
                .attr("fill", "white")
                .attr("width", 80)
                .attr("height", 40)
                .attr("transform", `translate(${180}, 160), rotate(45)`)
  
                svgselect.append('rect')
                .attr("fill", "white")
                .attr("width", 100)
                .attr("height", 40)
                .attr("x", 250)
                .attr("y", 200)

              svgselect.append('line')
                .attr('x1', 100)
                .attr('y1', 150)
                .attr('x2', 200)
                .attr('y2', 250)
                .attr('stroke', 'black')
                .attr('stroke-width', '4px')

                svgselect.append('line')
                .attr('x1', 200)
                .attr('y1', 250)
                .attr('x2', 400)
                .attr('y2', 250)
                .attr('stroke', 'black')
                .attr('stroke-width', '4px');
            }

            
          })
      }

      console.log(model);

    }, [lines, svgselect, selected]);

    const addLine = (type: string) => {

      if(lines.filter(l => l.type === type).length > 0 && type !== "modifier"){
        return
      }

      if(type == 'object' && lines.filter(l => l.type === 'object_2').length > 0){
        return
      }

      if(type == 'object_2' && lines.filter(l => l.type === 'object').length > 0){
        return
      }

      const lineToAdd : lineObject = {
        type: type,
        text: null,
        parent: null
      }

      if(type === 'modifier'){
        if(selected === null || lines.filter(l => l.parent === selected).length == 2){
          return
        } else {
          lineToAdd.parent = selected;
        }
      }


      setLines([...lines, lineToAdd])
    }

    const undoDraw = () => {
      if(lines.length === 0){
        return
      }
      lastDrawn = [...lastDrawn, lines[lines.length-1]];
      const slicedLines = lines.slice(0, lines.length-1);
      setLines(slicedLines)

    }

    const redoDraw = () => {
      if(lastDrawn.length === 0){
        return
      }

      setLines([...lines, lastDrawn[lastDrawn.length-1]])
      lastDrawn = lastDrawn.slice(0, lastDrawn.length-1)
    }

    const nextDraw = () => {

      let c : canvas = {
        sentence: data[index].sentence,
        linesArr : lines,
        lastDrawn: lastDrawn
      }

      canvasDrawings[index] = c;
      

      index++
      if(canvasDrawings[index] === undefined || canvasDrawings[index] === null){
        lastDrawn = []
        setLines([]);
      } else {
        setLines(canvasDrawings[index].linesArr)
        lastDrawn = canvasDrawings[index].lastDrawn
      }
      console.log(canvasDrawings)


    }

    const prevDraw = () => {
      if(canvasDrawings.length === 0){
        return
      }
      let c : canvas = {
        sentence: data[index].sentence,
        linesArr : lines,
        lastDrawn: lastDrawn
      }

      canvasDrawings[index] = c;
      
      index--;
      setLines(canvasDrawings[index].linesArr)
      lastDrawn = canvasDrawings[index].lastDrawn
      console.log(canvasDrawings)
    }

    const buttons = [
      {
        text: "subject",
        img: subject
      },
      {
        text: "predicate",
        img: predicate
      },
      {
        text: "modifier",
        img: modifier
      },
    ];

    const buttons2 = [
      {
        text: "object",
        img: object
      },
      {
        text: "object_2",
        img: object_2
      },
      {
        text: "preposition",
        img: preposition
      },
    ]

  return (
    <>
      <div className='container relative mx-auto'>
        <div className="flex flex-col md:flex-row mx-auto space-x-10">
          <div className="flex flex-col lg:w-2/5">
          <div className='space-y-6'>
        <div className='flex flex-col mt-10 mx-auto'>
          <div className="inline items-center space-x-2">
          {data[index].sentence.split(" ").map((s) => {
              return <span key={v4()} draggable className="draggable font-bold text-3xl text-center md:text-left">{s}</span>
            })}
          </div>
        </div>
        <hr className='mx-auto h-1 bg-gray-200 rounded w-4/5 md:w-full'/>
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-row space-x-10 items-center pt-10">
            {buttons.map((s) => {
              return <button key={v4()} onClick={() => addLine(s.text)}>
                        <img src={s.img} alt={"placeholder: "+ s.text}className='rounded-lg w-20 h-20 hover:border-black hover:border-4'/>
                    </button>
            })}
          </div>
          <div className='flex flex-row space-x-10 items-center pt-16'>
            {buttons2.map( s => {
              return <button key={v4()} onClick={() => addLine(s.text)}>
                        <img src={s.img} alt={"placeholder: "+ s.text} className='rounded-lg w-20 h-20 hover:border-black hover:border-4'/>
                    </button>
            })}
          </div>
        </div>
    </div>
          </div>
          <div className="flex flex-col lg:w-3/5 h-screen items-center pt-20">
            <div className='relative container flex items-center h-2/3 border-solid border-4 w-full mx-auto rounded-[32px]'>
                <svg ref={svgRef} className='svg h-full w-full'/>
            </div>
            <div className='flex flex-row space-x-10 items-center text-white pt-6'>
                <div className="flex flex-row space-x-4">
                    <button onClick={() => undoDraw()} className="bg-red-300 space-x-2 font-bold text-lg py-2 px-4 rounded-lg flex">
                        <ArrowUturnLeftIcon className='w-6 h-6'/><span>Undo</span>
                    </button>
                    <button onClick={() => redoDraw()} className="flex space-x-2 bg-purple-300 font-bold text-lg py-2 px-4 rounded">
                        <span>Redo</span><ArrowUturnRightIcon className='w-6 h-6'/>
                    </button>
                </div>
                <div className="flex flex-row space-x-4">
                    <button onClick={()=> prevDraw()} className="flex items-center space-x-2 bg-yellow-300 font-bold text-lg py-2 px-4 rounded">
                        <ChevronDoubleLeftIcon className='h-6 w-6' /><span>Pev</span>
                    </button>
                    <button onClick={()=> nextDraw()}  className="flex items-center space-x-2 bg-green-300 font-bold text-lg py-2 px-4 rounded">
                        <span>Next</span><ChevronDoubleRightIcon className='h-6 w-6'/>
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Quiz