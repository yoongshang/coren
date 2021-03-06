import hoistStatic from 'hoist-non-react-statics';
import React from 'react';
import hook from '../shared/componentHook';
import shortid from 'shortid';

export default function() {
  return WrappedComponent => {
    const uniqId = shortid.generate();
    hook.componentDidImport(uniqId, WrappedComponent);
    class Hoc extends React.Component {
      constructor(props) {
        super(props);
        hook.componentDidConstruct(uniqId, WrappedComponent, props);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    return hoistStatic(Hoc, WrappedComponent);
  };
}
