// i18n filter to output i18n messages
angular.module('mag.filters', []).filter('i18n', function() {
	
  return function(messageId) {
    return (lang=='Tr') ? appMessages[messageId].Tr : appMessages[messageId].En;
  };
  
});