/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////
class IconMarkupExtension extends Autodesk.Viewing.Extension {
  constructor(viewer) {
    let options = {
      icons: [
        {
          dbId: 458,
          label: '30&#176;C',
          css: 'fas fa-thermometer-full'
        },
        {
          dbId: 14,
          label: '35&#176;C',
          css: 'fas fa-thermometer-full'
        },
        {
          dbId: 59,
          label: '45&#176;C',
          css: 'fas fa-thermometer-empty'
        }
      ],
      button: {
        icon: 'fa-thermometer-half',
        tooltip: 'Show Temperature'
      }
    }
    super(viewer, options)
    this._group = null
    this._button = null
    this._icons = options.icons || []
  }

  load() {
    if (this.viewer.model.getInstanceTree()) {
      this.customize()
    } else {
      this.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, this.customize())
    }
    return true
  }

  unload() {
    // Clean our UI elements if we added any
    if (this._group) {
      this._group.removeControl(this._button)
      if (this._group.getNumberOfControls() === 0) {
        this.viewer.toolbar.removeControl(this._group)
      }
    }
    $('#' + this.viewer.clientContainer.id + ' div.adsk-viewing-viewer label.markup').remove()
    return true
  }

  customize() {
    const updateIconsCallback = () => {
      if (this._enabled) {
        this.updateIcons()
      }
    }
    this.viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, updateIconsCallback)
    this.viewer.addEventListener(Autodesk.Viewing.ISOLATE_EVENT, updateIconsCallback)
    this.viewer.addEventListener(Autodesk.Viewing.HIDE_EVENT, updateIconsCallback)
    this.viewer.addEventListener(Autodesk.Viewing.SHOW_EVENT, updateIconsCallback)
  }

  onToolbarCreated() {
    // Create a new toolbar group if it doesn't exist
    this._group = this.viewer.toolbar.getControl('customExtensions')
    if (!this._group) {
      this._group = new Autodesk.Viewing.UI.ControlGroup('customExtensions')
      this.viewer.toolbar.addControl(this._group)
    }

    // Add a new button to the toolbar group
    this._button = new Autodesk.Viewing.UI.Button('IconExtension')

    this._button.onClick = ev => {
      this._enabled = !this._enabled
      this.showIcons(this._enabled)
      this._button.setState(this._enabled ? 0 : 1)
    }
    this._button.setToolTip(this.options.button.tooltip)
    this._button.icon.classList.add('fas', this.options.button.icon)
    this._group.addControl(this._button)
  }

  showIcons(show, options) {
    this._icons = options
    this._enabled = !this._enabled
    // this._button.setState(this._enabled ? 0 : 1)
    const $viewer = $('#' + this.viewer.clientContainer.id + ' div.adsk-viewing-viewer')

    // remove previous...
    $('#' + this.viewer.clientContainer.id + ' div.adsk-viewing-viewer label.markup').remove()
    if (!show) return

    // do we have anything to show?
    if (this._icons === undefined || this.icons === null) return

    // do we have access to the instance tree?
    const tree = this.viewer.model.getInstanceTree()
    if (tree === undefined) {
      console.log('Loading tree...')
      return
    }

    const onClick = e => {
      // this.viewer.select($(e.currentTarget).data('id'))
      // this.viewer.utilities.fitToView()
    }

    this._frags = {}
    for (let i = 0; i < this._icons.length; i++) {
      // we need to collect all the fragIds for a given dbId
      const icon = this._icons[i]
      this._frags['dbId' + icon.dbId] = []
      const $label = $(`
      <label class="markup ${icon.label} update" data-id="${icon.dbId}"  > 
      <img class="markup-img modal-target" src="/images/model/${icon.label.toLowerCase()}.jpeg" alt="img">
      <div class='markup-content'>
       ${icon.data
         .map(
           i => `
       <div class="badge-container">
      <div class="badge-position">
        <i class="${i.icon} badge-icon" style='color: ${i.color};' aria-hidden="true"></i>
        <div class="badge-value">${i.value}</div>

      </div>
      </div>
        `
         )
         .join('')}
      </div>
      <div class='markup-button' >Parcelle ${icon.label}</div>

     
              `)

      $label.css('display', this.viewer.isNodeVisible(icon.dbId) ? 'block' : 'none')
      $label.on('click', this.options.onClick || onClick)

      $viewer.append($label)

      // now collect the fragIds
      const getChildren = (topParentId, dbId) => {
        if (tree.getChildCount(dbId) === 0) getFrags(topParentId, dbId) // get frags for this leaf child
        tree.enumNodeChildren(dbId, childId => {
          getChildren(topParentId, childId)
        })
      }
      const getFrags = (topParentId, dbId) => {
        tree.enumNodeFragments(dbId, fragId => {
          this._frags['dbId' + topParentId].push(fragId)
          this.updateIcons() // re-position for each fragId found
        })
      }
      getChildren(icon.dbId, icon.dbId)
      $(`.${icon.label}`).on('click', function () {
        window.open(`/dashboards/crm?model=${icon.label}`, '_self')
      })
    }
    $viewer.append(` <!-- The Modal -->
    <div id="modal" class="modal">
      <img id="modal-content" class="modal-content">
      <div id="modal-caption" class="modal-caption"></div>
    </div>
    </div>`)

    this.openModal()
  }

  getModifiedWorldBoundingBox(dbId) {
    let fragList = this.viewer.model.getFragmentList()
    const nodebBox = new THREE.Box3()

    // for each fragId on the list, get the bounding box
    for (const fragId of this._frags['dbId' + dbId]) {
      const fragbBox = new THREE.Box3()
      fragList.getWorldBounds(fragId, fragbBox)
      nodebBox.union(fragbBox) // create a unifed bounding box
    }

    return nodebBox
  }

  updateIcons() {
    for (const label of $('#' + this.viewer.clientContainer.id + ' div.adsk-viewing-viewer .update')) {
      const $label = $(label)
      const id = $label.data('id')

      // get the center of the dbId (based on its fragIds bounding boxes)
      const pos = this.viewer.worldToClient(this.getModifiedWorldBoundingBox(id).center())

      // position the label center to it
      $label.css('left', Math.floor(pos.x - $label[0].offsetWidth / 2) + 'px')
      $label.css('top', Math.floor(pos.y - $label[0].offsetHeight) + 'px')
      $label.css('display', this.viewer.isNodeVisible(id) ? 'block' : 'none')
    }
  }

  openModal() {
    let modal = document.getElementById('modal')

    modal.addEventListener('click', function () {
      modal.style.display = 'none'
    })

    // global handler
    document.addEventListener('click', function (e) {
      if (e.target.className.indexOf('modal-target') !== -1) {
        let img = e.target
        let modalImg = document.getElementById('modal-content')
        let captionText = document.getElementById('modal-caption')
        modal.style.display = 'block'
        modalImg.src = img.src
      }
    })
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('IconMarkupExtension', IconMarkupExtension)
