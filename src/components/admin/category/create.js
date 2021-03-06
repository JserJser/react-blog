/**
 * Created by keep_wan on 2017/1/14.
 */
import React from 'react';
import {reduxForm,Field} from 'redux-form';
import {Row, Col,Button,notification} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CategoryActions from '../../../actions/admin/category/category';
class Create extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmits = this.handleSubmits.bind(this);
    
    }
    // 提交信息事件
    handleSubmits({categoryname,path,desc})
    {
        this.props.submitCategoryCreate({categoryname,path,desc})
        .then(()=>{
            if(this.props.adminCategory.msg.length !==0)
            {
                notification.open({
                    message:  this.props.adminCategory.msg,
                    description: this.props.adminCategory.msg,
                });
            }else
            {
                notification.open({
                    message: '存储错误',
                    description: '发生了一个错误',
                });
            }
        });
    }
    
    // 渲染表单字段
    renderField({input,label,type,meta: { touched, error }})
    {
        return(
            <div className="ant-row ant-form-item">
                <Col lg={3} className="ant-form-item-label">
                    <label className="ant-form-item-required">
                        {label}
                    </label>
                </Col>
                <Col lg={5} className="ant-form-item-control">
                    <input {...input} type={type} placeholder={label} className="ant-input ant-input-lg"/>
                    {touched && error && <span>{error}</span>}
                </Col>
            </div>
        );
    }
    renderTextarea({input,label,meta: { touched, error }})
    {
        return(
            <div className="ant-row ant-form-item">
                <Col lg={3} className="ant-form-item-label">
                    <label className="ant-form-item-required">
                        {label}
                    </label>
                </Col>
                <Col lg={5} className="ant-form-item-control">
                    <textarea {...input}  placeholder={label} className="ant-input ant-input-lg" />
                    {touched && error && <span>{error}</span>}
                </Col>
            </div>
        );
    }
    render()
    {
        
        const {handleSubmit,pristine,reset,submitting} = this.props;
        return(
            <Row>
                <form onSubmit={handleSubmit(this.handleSubmits)} className="ant-form" >
                    <Field component={this.renderField} name="categoryname" type="text" label="类型名"/>
                    <Field component={this.renderField} name="path" type="text" label="来源"/>
                    <Field component={this.renderTextarea} name="desc" label="说明"/>
                    <div className="ant-row ant-form-item">
                        <Col lg={{span:5,offset:3}}>
                            <Button type="primary" icon="user" htmlType="submit" disabled={submitting} style={{marginRight:"1rem"}}>
                                提交
                            </Button>
                            <Button type="ghost" icon="cloud" disabled={pristine || submitting} onClick={reset} style={{marginRight:"1rem"}}>
                                取消
                            </Button>
                        </Col>
                    </div>
                </form>
                {this.props.adminCategory.error !== undefined && notification.open({
                    message:  this.props.adminCategory.error,
                    description: this.props.adminCategory.error,
                })}
            </Row>
        );
    }
}
Create.propTypes = {
    handleSubmit:React.PropTypes.func.isRequired,
    pristine:React.PropTypes.bool.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    reset:React.PropTypes.func.isRequired,
    submitCategoryCreate:React.PropTypes.func.isRequired,
    adminCategory:React.PropTypes.object.isRequired
};
/*eslint-disable no-class-assign*/ 
Create = reduxForm({
    form:"createCategory"
})(Create);
const mapStateToProps = (state)=>{
    return {
        adminCategory:state.adminCategory
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(CategoryActions,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(Create);