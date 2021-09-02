const contentfulManagement = require('contentful-management');

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-ub2Cm7fhOpx9KmhGxw4UtcLitxZnJJOWr-XAsXLauSY'
  });

  return contentfulClient
    .getSpace('kt8nwgtmnmp4')
    .then(space => space.getEnvironment('master'));
};
