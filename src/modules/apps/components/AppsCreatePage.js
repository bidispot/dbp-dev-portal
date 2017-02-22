import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import { Row } from 'react-bootstrap';
import { Keys } from './AppsPage_messages';
import SFieldText from '../../../components/library/SFieldText';
import GenericLayout from '../../../components/library/GenericLayout';
import * as LayoutHelper from '../../../components/library/LayoutHelper';
import { submitNewApp, load, resetApp, updateApp, deleteApp } from '../actions';

class AppsCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditEnabled: true,
      isDetailPage: this.props.params.id // needs to parse window location to detect if an id is present, i.e. detail page
    };

    this.getConfig = this.getConfig.bind(this);
    this.onAppSubmit = this.onAppSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
  }

  getConfig() {
    return ({
      backLabel: Keys.BUTTON_BACK_TO_LIST,
      submitLabel: Keys.BUTTON_SUBMIT,
      isDetailPage: this.state.isDetailPage,
      isEditEnabled: this.state.isEditEnabled,
      remoteProps: this.props,
      errors: this.state.errors,
      onSubmit: this.props.handleSubmit(this.onAppSubmit),
      backAction: this.redirectUser,
      toggleEditAction: this.toggleEdit,
      deleteAction: this.deleteApp
    });
  }

  componentDidMount() {
    if (this.state.isDetailPage) {
      this.setState({
        isEditEnabled: false
      });
      // Load content
      this.props.load({
        id: this.props.params.id
      });
    } else {
      // Explicitely reset state app values (redux-form only reset initialValues property)
      this.props.resetApp();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSubmitSuccessful || nextProps.isDeleteSuccessful || nextProps.isUpdateSuccessful) {
      this.redirectUser();
    }
  }

  onAppSubmit(newValues) {
    if (this.state.isDetailPage) {
      return this.props.updateApp(newValues);
    } else {
      return this.props.submitNewApp(newValues);
    }
  }

  deleteApp() {
    this.props.deleteApp(this.props.initialValues);
  }

  toggleEdit() {
    this.setState({
      isEditEnabled: !this.state.isEditEnabled
    });
  }

  redirectUser() {
    this.props.router.replace('/appslist');
  }

  render() {
    return (
      <GenericLayout config={this.getConfig()}>
        <Row className="form-group">
          <Field
            type='text'
            name='name'
            label='Name'
            placeholder='Name'
            size={8}
            component={SFieldText}
            staticValue={this.props.initialValues.getName()}
            disabled={this.state.isDetailPage && !this.state.isEditEnabled} />
        </Row>
        <Row className="form-group">
          <Field
            type='textarea'
            name='description'
            label='Description'
            size={8}
            component={SFieldText}
            placeholder='Description of the application'
            staticValue={this.props.initialValues.getDescription()}
            disabled={this.state.isDetailPage && !this.state.isEditEnabled} />
        </Row>
        <Row className="form-group">
          <Field
            type='text'
            name='callback_url'
            label='Callback URL'
            size={8}
            placeholder='http://www.yourapi.com'
            component={SFieldText}
            staticValue={this.props.initialValues.getCallbackUrl()}
            disabled={this.state.isDetailPage && !this.state.isEditEnabled} />
        </Row>
        {LayoutHelper.renderActions(this.getConfig())}
      </GenericLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.apps.app,
    isLoadSuccessful: state.apps.isLoadSuccessful,
    isSubmitSuccessful: state.apps.isSubmitSuccessful,
    isUpdateSuccessful: state.apps.isUpdateSuccessful,
    isDeleteSuccessful: state.apps.isDeleteSuccessful
  }
};

export const AddAppCreateForm = reduxForm({
  form: 'appForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
  //validate
})(AppsCreatePage);

export default connect(mapStateToProps, { submitNewApp, load, resetApp, updateApp, deleteApp })(injectIntl(AddAppCreateForm));
