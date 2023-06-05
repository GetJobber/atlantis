//
//  PickerView.swift
//  Jobber
//
//  Created by Darryl Tec on 2022-07-21.
//  Copyright © 2022 Octopusapp Inc. All rights reserved.
//

import Foundation

import UIKit
@available(iOS 14.0, *)
@objc(PickerView)
class PickerView: UIButton {
    override init(frame: CGRect) {
      super.init(frame: frame)
    }
    private var _hasSelectedValue: Bool = false;
    private var _options: [UIAction] = [];

    @objc var onOptionPress: RCTDirectEventBlock?
    @objc func sendButtonAction(_ action: UIAction) {
        if let onPress = onOptionPress {
            onPress(["event": action.identifier.rawValue])
        }
    }

    @objc var options: [NSDictionary]? {
        didSet {
            guard let options = self.options else {
                return
            }
            _options.removeAll()
            options.forEach { menuAction in
                let opt = PickerOption(details: menuAction)
                _hasSelectedValue = opt.isActive
                _options.append(opt.createUIAction({action in self.sendButtonAction(action)}))
            }
            self.setup()
        }
    }

    func setup () {
        let menu = UIMenu(title: "", identifier: nil, options: .displayInline, children: _options)

        self.menu = menu
        self.showsMenuAsPrimaryAction = true
        if #available(iOS 15.0, *) {
            self.setTitleColor(UIColor.clear, for: .normal)
            self.changesSelectionAsPrimaryAction = true
        }
    }

    override func reactSetFrame(_ frame: CGRect) {
        super.reactSetFrame(frame);
    };

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
