import { Record } from 'immutable';

export class Api extends Record({
  name: '',
  context: 'Clearstream Xact',
  version: '',
  visibility: 'Public',
  thumbnail: null,
  description: '',
  tags: '',
  api_endpoint: '',
  doc_endpoint: ''
})
{
  getName() { return this.get('name'); }
  setName(name) { return this.set('name', name); }

  getContext() { return this.get('context'); }
  setContext(context) { return this.set('context', context); }

  getVersion() { return this.get('version'); }
  setVersion(version) { return this.set('version', version); }

  getVisibility() { return this.get('visibility'); }
  setVisibility(visibility) { return this.set('visibility', visibility); }

  getThumbnail() { return this.get('thumbnail'); }
  setThumbnail(thumbnail) { return this.set('thumbnail', thumbnail); }

  getDescription() { return this.get('description'); }
  setDescription(description) { return this.set('description', description); }

  getTags() { return this.get('tags'); }
  setTags(tags) { return this.set('tags', tags); }

  getApiEndpoint() { return this.get('api_endpoint'); }
  setApiEndpoint(api_endpoint) { return this.set('api_endpoint', api_endpoint); }

  getDocEndpoint() { return this.get('doc_endpoint'); }
  setDocEndpoint(doc_endpoint) { return this.set('doc_endpoint', doc_endpoint); }

};
