'use babel';

import ReactThreePackageView from './react-three-package-view';
import { CompositeDisposable } from 'atom';

export default {

  reactThreePackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
    'react-three-package:toggle': () => this.toggle()
    }));
    this.reactThreePackageView = new ReactThreePackageView(state.reactThreePackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.reactThreePackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'react-three-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.reactThreePackageView.destroy();
  },

  serialize() {
    return {
      reactThreePackageViewState: this.reactThreePackageView.serialize()
    };
  },

  toggle() {
    console.log('ReactThreePackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
