(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{28:function(e,t,n){e.exports=n(43)},33:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var i,a,r=n(0),c=n.n(r),s=n(25),l=n.n(s),o=(n(33),n(10)),m=n(11),h=n(13),d=n(12),u=n(14),g=n(3),p=n(9),w=n(7),f=n(17),v={allIds:[0,1,2,3,4,5,6,7,8,9,10],byId:{0:{id:0,height:679,width:1024,url:"https://live.staticflickr.com/7837/46852208034_1f768a633c_b_d.jpg"},1:{id:1,height:1024,width:679,url:"https://live.staticflickr.com/7856/46660570565_dd7cb62cd0_b_d.jpg"},2:{id:2,height:1024,width:679,url:"https://live.staticflickr.com/7820/40609973763_12f1b6b419_b_d.jpg"},3:{id:3,height:679,width:1024,url:"https://live.staticflickr.com/7835/32633607057_5bc8364604_b_d.jpg"},4:{id:4,height:679,width:1024,url:"https://live.staticflickr.com/7846/47576131171_19e5a0bdbc_b_d.jpg"},5:{id:5,height:1024,width:679,url:"https://live.staticflickr.com/7908/32633606977_16e48d70df_b_d.jpg"},6:{id:6,height:679,width:1024,url:"https://live.staticflickr.com/7827/40609972083_827edcf11d_b_d.jpg"},7:{id:7,height:679,width:1024,url:"https://live.staticflickr.com/7819/32633607187_23a906a20d_b_d.jpg"},8:{id:8,height:679,width:1024,url:"https://live.staticflickr.com/7866/33699205638_4fd36c940c_b_d.jpg"},9:{id:9,height:1024,width:679,url:"https://live.staticflickr.com/7903/32633606767_1cda0b9f60_b_d.jpg"},10:{id:10,height:679,width:1024,url:"https://live.staticflickr.com/7922/40609973373_e585031e3e_b_d.jpg"}}},E=n(8),b=Object(r.memo)(function(e){var t=e.data,n=e.index,i=e.style,a=t.rows,r=t.images,s=t.renderItem;return c.a.createElement("div",{key:n+a[n].contents.length,style:Object(w.a)({},i,{height:a[n].rowHeight})},a[n].contents.map(function(e,i){var a=r.byId[e.dimension.id];return s(t,e,n+i,a)}))},E.b),y=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e))).dimension=function(e,t,n){return{id:e,x:t,y:n}},n.scaleDimension=function(e,t){return{dimension:e,scale:t}},n.row=function(e,t){var a=n.props.size.width,r=e.map(function(e){var i=n.factorToFitInMinimumRowHeight(e)*t;return n.scaleDimension(e,i)}),c=a-r.map(function(e){return e.dimension.x*e.scale}).reduce(function(e,t){return e+t},0);return{contents:r,rowHeight:i*t,horizontalWhitespace:c}},n.makeNextRow=function(e){for(var t=n.props.size.width,r=t,c=[];e.length>0&&r>n.widthAtMinimumRowHeight(e[0]);)r-=n.widthAtMinimumRowHeight(e[0]),c.push(e.shift());var s=c.map(function(e){return n.widthAtMinimumRowHeight(e)}).reduce(function(e,t){return e+t},0),l=Math.min(t/s,a/i);return{next:n.row(c,l),remaining:e}},n.makeRows=function(e,t){var i=n.makeNextRow(t),a=i.next,r=i.remaining;return e.push(a),r.length>0&&e.concat(n.makeRows(e,r)),e},n.widthAtMinimumRowHeight=function(e){return n.factorToFitInMinimumRowHeight(e)*e.x},n.factorToFitInMinimumRowHeight=function(e){return i/e.y},n.getImageDimensions=function(e){var t=n.props.images.byId[e],i=t.width,a=t.height;switch(t.image_orientation){case"LeftBottom":return{x:a,y:i};default:return{x:i,y:a}}},n.makeDimensions=function(){var e=n.props.images;return e.allIds.filter(function(t){var n=e.byId[t],i=n.width,a=n.height;return i&&a}).map(function(e){var t=n.getImageDimensions(e),i=t.x,a=t.y;return n.dimension(e,i,a)})},n.getItemSize=function(e){return n.rows[e].rowHeight},i=e.minimumRowHeight,a=e.maximumRowHeight,n.list=Object(r.createRef)(),n}return Object(u.a)(t,e),Object(m.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props.size,n=t.height,i=t.width;e.height===n&&e.width===i||this.list.resetAfterIndex(0,!0)}},{key:"render",value:function(){var e=this,t=this.props,n=t.images,i=t.size,a=t.renderItem,r=i.height,s=i.width,l=this.makeDimensions();this.rows=this.makeRows([],l);var o={rows:this.rows,images:n,renderItem:a};return c.a.createElement(E.a,{height:r,width:s,itemData:o,itemSize:this.getItemSize,itemCount:this.rows.length,ref:function(t){return e.list=t}},b)}}]),t}(r.Component),x={display:"flex",flexDirection:"row",height:"100%"},z={height:"100%",width:200},j={height:"100%",width:"100%",overflowY:"auto"};n(19),n(20);var _=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e))).animation={},n.state={size:{height:400,width:600}},n}return Object(u.a)(t,e),Object(m.a)(t,[{key:"sizeUp",value:function(){var e=this;clearInterval(this.animation),this.animation=setInterval(function(){return e.setState(function(t,n){return t.size.width<=600?{size:{height:t.size.height,width:t.size.width+25}}:e.sizeDown()})},500)}},{key:"sizeDown",value:function(){var e=this;clearInterval(this.animation),this.animation=setInterval(function(){return e.setState(function(t,n){return t.size.width>=300?{size:{height:t.size.height,width:t.size.width-25}}:e.sizeUp()})},500)}},{key:"componentWillUnmount",value:function(){clearInterval(this.animation)}},{key:"render",value:function(){return c.a.createElement("main",{style:x},c.a.createElement("section",{style:z},c.a.createElement("h1",null,c.a.createElement(g.b,{to:"/"},"DreamGrid")," \u2022 ",c.a.createElement(g.b,{to:"/docs"},"Docs")),c.a.createElement("p",null,c.a.createElement("i",null,"The ideal image grid component")),c.a.createElement("ol",null,c.a.createElement("li",null,"deterministic"),c.a.createElement("li",null,"responsive"),c.a.createElement("li",null,"respects image aspect ratios")),c.a.createElement("h3",null,"Examples"),c.a.createElement(g.b,{to:"/docs/responsive"},"Responsive Grid"),c.a.createElement("br",null),c.a.createElement(g.b,{to:"/docs/static"},"Static Grid")),c.a.createElement("section",{style:j},c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("h1",null,"DreamGrid 0.1.0 Beta is here and it's \ud83d\udd25."),c.a.createElement("i",null,"The ideal image grid component")),c.a.createElement("br",null),c.a.createElement("div",{style:Object(w.a)({},this.state.size)},c.a.createElement(f.a,null,function(e){return c.a.createElement(y,{size:e,images:v,minimumRowHeight:180,maximumRowHeight:350,renderItem:function(e,t,n,i){return c.a.createElement("img",{alt:"",src:i.url,style:{padding:"unset",width:t.dimension.x*t.scale,height:t.dimension.y*t.scale}})}})})))))}}]),t}(r.Component),R=(Object(r.memo)(function(e){e.data;var t=e.content,n=e.index,i=e.image;return c.a.createElement("img",{key:n,src:i.url,style:{width:t.dimension.x*t.scale,height:t.dimension.y*t.scale}})},E.b),n(18)),I=n.n(R);n(19),n(20);var k={height:400,width:600},D=function(){return c.a.createElement(r.Fragment,null,c.a.createElement("h5",null,"Responsive Grid"),c.a.createElement("div",{style:Object(w.a)({},k,{width:"100%"})},c.a.createElement(f.a,null,function(e){return c.a.createElement(y,{size:e,images:v,minimumRowHeight:180,maximumRowHeight:350,renderItem:function(e,t,n,i){return c.a.createElement("img",{alt:"",src:i.url,style:{padding:"unset",width:t.dimension.x*t.scale,height:t.dimension.y*t.scale}})}})})),c.a.createElement(I.a,{component:"pre",className:"language-javascript"},"\n  import DreamGrid from 'DreamDrid';\n  import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';\n\n  const renderItem = (data, content, index, image) => { // has these arguments\n    return (\n      <img\n          alt=\"\"\n          src={image.url}\n          style={{\n              width: content.dimension.x * content.scale,\n              height: content.dimension.y * content.scale,\n          }}\n      />\n    );\n  };\n\n  const App = () => {\n    return (\n      <ReactVirtualizedAutoSizer>\n        {\n          (sizes) => {\n            return (\n              <DreamGrid\n                size={sizes}\n                images={images}\n                minimumRowHeight={180}\n                maximumRowHeight={350}\n                renderItem={(data, content, index, image) => {\n                  return (\n                    <img\n                        alt=\"\"\n                        src={image.url}\n                        style={{\n                            padding: 'unset',\n                            width: content.dimension.x * content.scale,\n                            height: content.dimension.y * content.scale,\n                            // TODO spead height and width behind the scenes\n                        }}\n                    />\n                  );\n                }}\n              />\n            );\n          }\n        }\n      </ReactVirtualizedAutoSizer>\n    );\n  }\n"))};n(19),n(20);var O={height:500,width:400},H=function(){return c.a.createElement(r.Fragment,null,c.a.createElement("h5",null,"Static Grid"),c.a.createElement("section",{style:{display:"flex",alignItems:"center",justifyContent:"center"}},c.a.createElement("div",{style:Object(w.a)({},O,{display:"flex",flex:1})},c.a.createElement(y,{size:O,images:v,minimumRowHeight:180,maximumRowHeight:350,renderItem:function(e,t,n,i){return c.a.createElement("img",{alt:"",src:i.url,style:{padding:"unset",width:t.dimension.x*t.scale,height:t.dimension.y*t.scale}})}})),c.a.createElement("div",{style:{height:O.height,display:"flex",flex:1}},c.a.createElement(I.a,{component:"pre",className:"language-javascript"},"\n  import DreamGrid from 'DreamDrid';\n\n  const size = {\n    height: 300,\n    width: 600,\n  };\n\n  const App = () => {\n      return (\n        <DreamGrid\n          size={size}\n          images={images}\n          minimumRowHeight={180}\n          maximumRowHeight={350}\n          renderItem={(data, content, index, image) => {\n            return (\n              <img\n                  alt=\"\"\n                  src={image.url}\n                  style={{\n                      padding: 'unset',\n                      width: content.dimension.x * content.scale,\n                      height: content.dimension.y * content.scale,\n                      // TODO spead height and width behind the scenes\n                  }}\n              />\n            );\n          }}\n        />\n      );\n    );\n  }\n\n"))))},G={display:"flex",flexDirection:"row",height:"100%"},A={height:"100%",width:200},S={height:"100%",width:"100%",overflowY:"auto"},M=function(e){return c.a.createElement("main",{style:G},c.a.createElement("section",{style:A},c.a.createElement("h1",null,c.a.createElement(g.b,{to:"/"},"DreamGrid")," \u2022 ",c.a.createElement(g.b,{to:"/docs"},"Docs")),c.a.createElement("h3",null,"Examples"),c.a.createElement(g.b,{to:"/docs/responsive"},"Responsive Grid"),c.a.createElement("br",null),c.a.createElement(g.b,{to:"/docs/static"},"Static Grid")),c.a.createElement("section",{style:S},c.a.createElement(p.c,null,c.a.createElement(p.a,{exact:!0,path:"/docs/static",component:H}),c.a.createElement(p.a,{exact:!0,path:["/docs","/docs/responsive"],component:D}))))},T=function(e){function t(){return Object(o.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return c.a.createElement(g.a,null,c.a.createElement(p.a,{exact:!0,path:"/",component:_}),c.a.createElement(p.a,{path:"/docs",component:M}))}}]),t}(r.Component);l.a.render(c.a.createElement(T,null),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.09ec6f20.chunk.js.map