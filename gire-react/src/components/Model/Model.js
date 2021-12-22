import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDetail,selectedNode } from '../../reducers/modelReducer';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import Grid from '@material-ui/core/Grid';
import ModelInfo from './ModelInfo';
import * as Scroll from 'react-scroll';


const CustomNode = (props) => {
    const { inputs } = props;
    const dispatch = useDispatch();
    const selected_node = useSelector(selectedNode);
    const bg_color = (selected_node === props.content ? '#a8def8': '#94b49d')

    const onClick= function(){
        dispatch(setDetail(props.content));
        Scroll.animateScroll.scrollToBottom();
    }

    return (
      <div style={{ background:bg_color, borderRadius: '5px' }} onClick={onClick}>
        <div style={{ padding: '15px', color: 'white'  }}>
          {props.content}
        </div>
        <div style={{marginTop: '20px'}}>
          {inputs.map((port) => React.cloneElement(port, {
            style: { width: '50px', height: '25px', background: '#1B263B' }
          }))}
        </div>
      </div>
    );
  };


const initialSchema = createSchema({
    nodes: [
      { id: 'inchar', content: 'Individual characteristics', coordinates: [600, 500], render: CustomNode, disableDrag:false },
      { id: 'perceptions', content: 'Perceptions', coordinates: [550, 630], render: CustomNode, disableDrag:true },
      { id: 'beliefs', content: 'Beliefs', coordinates: [700, 630], render: CustomNode, disableDrag:false },
      { id: 'preferences', content: 'Preferences', coordinates: [810, 630], render: CustomNode, disableDrag:false },
      { id: 'skills', content: 'Skills', coordinates: [960, 630], render: CustomNode, disableDrag:true },
      { id: 'motivations', content: 'Motivations', coordinates: [1050, 630], render: CustomNode, disableDrag:false },
      { id: 'socchar', content: 'Social Characteristics', coordinates: [140, 550], render: CustomNode, disableDrag:true },
      { id: 'access', content: 'Access', coordinates: [55, 650], render: CustomNode, disableDrag:true },
      { id: 'environment', content: 'Environment', coordinates: [170, 650], render: CustomNode, disableDrag:true },
      { id: 'responsabilities', content: 'Responsabilities', coordinates: [320, 650], render: CustomNode, disableDrag:true },
      { id: 'char', content: 'Characteristics', coordinates: [400, 400], render: CustomNode, disableDrag:true },
      { id: 'gid', content: 'Gender Identity', coordinates: [400, 300], render: CustomNode, disableDrag:true },
      { id: 'gexp', content: 'Gender Expression', coordinates: [200, 200], render: CustomNode, disableDrag:true },
      { id: 'bsex', content: 'Biological Sex', coordinates: [600, 200], render: CustomNode, disableDrag:true },
      { id: 'ingen', content: 'Individual Gender', coordinates: [400, 100], render: CustomNode, disableDrag:true },
      { id: 'ginc', content: 'Gender Inclusiveness requirements', coordinates: [1250, 630], render: CustomNode, disableDrag:true },
      { id: 'soft', content: 'Software System', coordinates: [1300, 500], render: CustomNode, disableDrag:true },
      { id: 'intcontext', content: 'Interaction Context', coordinates: [1200, 380], render: CustomNode, disableDrag:true },
      { id: 'teccontext', content: 'SocioTechnical Context', coordinates: [1380, 380], render: CustomNode, disableDrag:true },
      { id: 'soccontext', content: 'Sociocultural Context', coordinates: [1300, 250], render: CustomNode, disableDrag:true },
      { id: 'int', content: 'Interaction', coordinates: [1000, 380], render: CustomNode, disableDrag:true },
      { id: 'hu', content: 'Human Actor', coordinates: [1000, 280], render: CustomNode, disableDrag:true },
      { id: 'groles', content: 'Gender Roles', coordinates: [1000, 180], render: CustomNode, disableDrag:true },
      { id: 'gnorms', content: 'Gender Norms', coordinates: [1200, 180], render: CustomNode, disableDrag:true },
      { id: 'sgender', content: 'Structural Gender', coordinates: [1100, 100], render: CustomNode, disableDrag:true },
      { id: 'identity', content: 'Identity', coordinates: [800, 280], render: CustomNode, disableDrag:true },
      { id: 'gender', content: 'Gender', coordinates: [800, 50], render: CustomNode, disableDrag:true },


    ],
    links: [
      { input: 'inchar',  output: 'perceptions', readonly:true},
      { input: 'inchar',  output: 'beliefs', readonly:true },
      { input: 'inchar',  output: 'preferences', readonly:true },
      { input: 'inchar',  output: 'skills', readonly:true },
      { input: 'inchar',  output: 'motivations', readonly:true },
      { input: 'socchar',  output: 'access', readonly:true },
      { input: 'socchar',  output: 'environment', readonly:true },
      { input: 'socchar',  output: 'responsabilities', readonly:true, className: 'my-custom-link-class' },
      { input: 'char',  output: 'socchar', readonly:true, className: 'my-custom-link-class' },
      { input: 'char',  output: 'inchar', readonly:true, className: 'my-custom-link-class' },
      { input: 'gid',  output: 'char', readonly:true, className: 'my-custom-link-class' },
      { input: 'gid',  output: 'gexp', readonly:true, className: 'my-custom-link-class' },
      { input: 'ingen',  output: 'gid', readonly:true, className: 'my-custom-link-class' },
      { input: 'ingen',  output: 'gexp', readonly:true, className: 'my-custom-link-class' },
      { input: 'ingen',  output: 'bsex', readonly:true, className: 'my-custom-link-class' },
      { input: 'ginc',  output: 'soft', readonly:true, className: 'my-custom-link-class' },
      { input: 'soft',  output: 'intcontext', readonly:true, className: 'my-custom-link-class' },
      { input: 'soft',  output: 'teccontext', readonly:true, className: 'my-custom-link-class' },
      { input: 'soccontext',  output: 'intcontext', readonly:true, className: 'my-custom-link-class' },
      { input: 'soccontext',  output: 'teccontext', readonly:true, className: 'my-custom-link-class' },
      { input: 'int',  output: 'intcontext', readonly:true, className: 'my-custom-link-class' },
      { input: 'hu',  output: 'int', readonly:true, className: 'my-custom-link-class' },
      { input: 'hu',  output: 'groles', readonly:true, className: 'my-custom-link-class' },
      { input: 'groles',  output: 'gnorms', readonly:true, className: 'my-custom-link-class' },
      { input: 'sgender',  output: 'gnorms', readonly:true, className: 'my-custom-link-class' },
      { input: 'sgender',  output: 'groles', readonly:true, className: 'my-custom-link-class' },
      { input: 'bsex',  output: 'groles', readonly:true, className: 'my-custom-link-class' },
      { input: 'hu',  output: 'identity', readonly:true, className: 'my-custom-link-class' },
      { input: 'identity',  output: 'gender', readonly:true, className: 'my-custom-link-class' },
      { input: 'identity',  output: 'char', readonly:true, className: 'my-custom-link-class' },
      { input: 'identity',  output: 'ingen', readonly:true, className: 'my-custom-link-class' },
      { input: 'gender',  output: 'sgender', readonly:true, className: 'my-custom-link-class' },
      { input: 'gender',  output: 'ingen', readonly:true, className: 'my-custom-link-class' },
      { input: 'soft',  output: 'int', readonly:true, className: 'my-custom-link-class' },
      { input: 'char',  output: 'int', readonly:true, className: 'my-custom-link-class' },
      { input: 'ginc',  output: 'int', readonly:true, className: 'my-custom-link-class' },
      { input: 'char',  output: 'ginc', readonly:true, className: 'my-custom-link-class' },
     /*{ input: 'gender',  output: 'soccontext', readonly:true, className: 'my-custom-link-class' },*/
      { input: 'sgender',  output: 'soccontext', readonly:true, className: 'my-custom-link-class' },
    ]
  });


const Model=()=>{
    const [schema, { onChange }] = useSchema(initialSchema);
    
    return( 
        <Grid container justifyContent = "center" spacing={0}>
        <Grid item xs={12} md={10} >
            <div style={{ height: '44.5rem' }}>
                <Diagram schema={schema} onChange={onChange} onClick={onChange} />
        </div>
            <div><ModelInfo /></div>
        </Grid>
        </Grid>
    );
}

export default Model;