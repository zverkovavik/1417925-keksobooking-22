import './api.js';
import './utils.js';
import './filter.js';
import './map.js';
import './card.js';
import './form-state.js';
import './form-validation.js';
import './submit-form.js';
import './adding-photo.js';

import { makeGetRequest } from './api.js';
import { showAlert } from './utils.js';
import { renderMapMarkers } from './map.js';

makeGetRequest(renderMapMarkers, showAlert);
