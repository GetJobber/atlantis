//
//  RCTPickerManager.m
//  Jobber
//
//  Created by Darryl Tec on 2022-07-21.
//  Copyright © 2022 Octopusapp Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RCTATLPicker, RCTViewManager)

/**
 * Options the user can choose
 */
RCT_EXPORT_VIEW_PROPERTY(options, NSArray)

/**
 * Callback when one of the option is pressed
 */
RCT_EXPORT_VIEW_PROPERTY(onOptionPress, RCTDirectEventBlock)

@end
