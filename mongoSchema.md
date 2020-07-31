```json
{
  "geometry": { # Geojson geometry object
    "type": "oneOf(['point', 'multipoint', 'line', 'multiline', 'polygon', 'multipolygon'])",
    "coordinates": [[ ["point_long", "point_lat"], [], [],[] ]]
  },
  "sender": {
    "email": "<email string>",
    "get_alerted": true
  },
  "report": {
    "createdDate": "<string containing date>",
    "type": "oneOf(['road', 'groundskeeping?', 'utility', ''])",
    "description": "<string describing the issue>",
    "originalImageUrl": "<string of url>",
    "additionalImages": ["<other urls of images>"]
  }
}
```