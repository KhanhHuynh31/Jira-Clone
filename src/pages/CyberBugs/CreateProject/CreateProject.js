import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { connect, useSelector, useDispatch } from 'react-redux'
function CreateProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();

    const {
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;


    useEffect(() => {
        dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' })
    }, []);

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }
    return (
        <div className="main container-fluid">
            <div className="mt-3" >
                <h3>CreateProject</h3>
                <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
                    <div className="form-group mt-3">
                        <p>Name</p>
                        <input className="form-control" name="projectName" />
                    </div>
                    <div className="form-group  mt-3">
                        <p>Description</p>
                        <Editor

                            name="description"

                            init={{
                                selector: 'textarea#myTextArea',

                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                    <div className="form-group">
                        <select name="categoryId" className="form-control" onChange={handleChange}>
                            {arrProjectCategory.map((item, index) => {
                                return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                    <button className="btn btn-outline-primary mt-3" type="submit">Create project</button>
                </form>
            </div>
        </div>
    )
}
const createProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            // categoryId: props.arrProjectCategory[0]?.id
        }
    },

    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        props.dispatch({
            type: 'CREATE_PROJECT_SAGA',
            newProject: values
        })


    },
    displayName: 'CreateProjectFormik',
})(CreateProject);

const mapStateToProps = (state) => ({

    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory

})


export default connect(mapStateToProps)(createProjectForm);