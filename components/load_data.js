export default function () {
    var loadData = {};
    if (!this.refs || !this.metaData) return;

    if (this.refs.selectable) {
        _.forEach(this.metaData, (ref) => {
            loadData[ref] = this.refs.selectable.props.selectClass || this.refs.selectable.state.selectClass;
            this.refs.selectable.loadData = loadData;
        });
    }

    if (this.refs.dropzone) {
        this.refs.dropzone.loadData = this.metaData;
    }

    this.completeRefs();
}
