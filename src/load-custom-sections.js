String.prototype.indexOfEnd = function(string) {
    const io = this.indexOf(string);
    return io == -1 ? -1 : io + string.length;
}
import { BASE_URL } from './constants';
$(document).ready(function () {
    debugger;
    let sectionIds = '';
    $.each($('[id^="custom-section-"]'), (index, value) => {
        let sectionId = value.id.substr(value.id.indexOfEnd('custom-section-'));
        sectionIds += sectionId +','
    });
    sectionIds = sectionIds.substr(0,sectionIds.length - 1);

    $.getJSON( BASE_URL + 'sections?section-ids=' + sectionIds, function( data ) {

        for (const [key, value] of Object.entries(data)) {
            $('#custom-section-' + key).replaceWith(value);
        }
    });
});


