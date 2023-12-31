AFRAME.registerComponent("atoms", {
   init:async function(){
    var compounds=await this.getCompunds()
    console.log(compounds)

    var barcodes=Object.keys(compounds)

    barcodes.map(barcode=>{
        var element=compounds[barcode]
        console.log(element)
    })
   },

   getCompunds:function(){
    return fetch("js/compoundList.json")
    .then(res=>res.json())
    .then(data=>data)
   },

   getElementColors:function(){
    return fetch("js/elementColors.json")
    .then(res=>res.json())
    .then(data=>data)
   },

   createAtoms:async function(element){

    var elementName=element.element_name
    var barcodeValue=element.barcode_value
    var numOfelectrons=element.number_of_electrons

    var colors=await thid.getElementColors()

    var scene= document.querySelector("a-scene")
    var marker=document.createElement("a-marker")
    marker.setAttribute("id",`marker-${barcodeValue}`)
    marker.setAttribute("type","barcode")
    marker.setAttribute("value",barcodeValue)

    var atom=document.createElement("a-entity")
    atom.setAttribute("id",`${elementName}-${barcodeValue}`)
    marker.appendChild(atom)

    var card= document.createElement("a-entity")
    card.setAttribute("id",`card-${elementName}`)
    card.setAttribute("geometry",{
        ptimitive:plane,
        width:1,
        height:1
    })

    card.setAttribute("material",{
        src:`assets/atom_cards/card_${elementName}.png`
    })
    card.setAttribute("position",{x:0,y:0,z:0})
    card.setAttribute("rotation",{x:-90,y:0,z:0})

    atom.appendChild(card)

    var nucleus=document.createElement("a-entity")
    nucleus.setAttribute("id",`nucles-${elementName}`)
    nucleus.setAttribute("geometry",{
        primitive:"sphere",
        radius:0.2
    })

    nucleus.setAttribute("material","color",colors[elementName])
    nucleus.setAttribute("position",{x:0,y:1,z:0})
    nucleus.setAttribute("rotation",{x:0,y:0,z:0})


    

    var nucleusName=document.createElement("a-entity")
    nucleusName.setAttribute("id",`nuclesName-${elementName}`)
    nucleusName.setAttribute("position",{x:0,y:0.20,z:0})
    nucleusName.setAttribute("rotation",{x:-90,y:0,z:0})
    nucleusName.setAttribute("text",{
        font:"monoid",
        width:3,
        color:"black",
        align:"center",
        value:elementName
    })

    atom.appendChild(nucleus)
    nucleus.appendChild(nucleusName)
    
    scene.appendChild(marker)
    console.log(scene)

    var orbitAngle=-180;
    var electronAngle=30;
    for(var num=1;num<=numOfelectrons;num++){
        var orbit=document.createElement("a-entity");
        orbit.setAttribute("geometry",{
            primitive:"torus",
            arc:360,
            radius:0.28,
            radiusTubular:0.001,
        });
        orbit.setAttribute("material",{
            color:"white",
            opacity:0.3,
        });
        orbit.setAttribute("position",{x:0,y:0.1,z:0});
        orbit.setAttribute("rotation",{x:0,y:orbitAngle,z:0})
        orbitAngle+=45;
        atom.appendChild(orbit);

        var electronGroup=document.createElement("a-entity");
        electronGroup.setAttribute("id",`electronGroup-${elementName}`);
        electronGroup.setAttribute("animation",{
            property:"rotation",
            to:`0 0 -360`,
            loop:true,
            dur:3500,
            easing:linear
        });
        orbit.appendChild(electronGroup)

        var electron=document.createElement("a-entity");
        electron.setAttribute("id", `electron-${elementName}`);
        electron.setAttribute("geometry",{
            primitive:"sphere",
            radius:0.02,
        });
        electron.setAttribute("material",{
            color:"gold",
            opacity:0.7,
        });
        electron.setAttribute("position",{x:0.2,y:0.2,z:0})
        electron.setAttribute("rotation",{x:0,y:0,z:electronAngle})
        electronAngle+=65
        electronGroup.appendChild(electron)
    }
    scene.appendChild(marker)
    console.group(scene)
   }
   
   
   
  
  
  
  
});
