//
//  AtlantisNativeInterface.m
//  ComponentsNative
//
//  Created by Michael Paradis on 2023-06-12.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AtlantisNativeInterface, RCTEventEmitter)

RCT_EXTERN_METHOD(openActionSheet:(NSString *)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)


+(BOOL)requiresMainQueueSetup
{
    return YES;
}
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
