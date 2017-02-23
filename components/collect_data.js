export default function () {
    var data = {};
    if (!this.refs) return data;

    if (this.refs.selectable) {
        data = [];
        _.forIn(this.refs.selectable.refs, (ref) => {
            if (_.includes(ref.props.className, 'SELECTED') ||
                _.includes(ref.props.className, 'HIGHLIGHTED')) {
                data.push(ref.props['data-ref']);
            }
        });
    }

    if (this.refs.dropzone) {
        _.forIn(this.refs.dropzone.refs, (ref, key) => {
            if (key.indexOf('dropzone-') === -1 || !ref.state.content) return;

            if (ref.props.multipleAnswers) {
                data[key] = [];
                _.forIn(ref.state.content, (ref2) => {
                    data[key].push(ref2.props.message);
                });
            } else {
                data[key] = {
                    ref: ref.state.content.props.message,
                    state: ref.state.content.state
                };
            }
        });
    }

    return data;
}
