package com.example.shinwebtv;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.TargetApi;
import android.app.Dialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Message;
import android.provider.Settings;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Date;

public class MainActivity extends AppCompatActivity {
    private WebView webView=null;
    private WebView hiddenView=null;
    private WebView adView=null;
    private WebView trueView=null;
    private String ssid=null;
    private String sid;
    private String dday=null;
    private String today;
    private SharedPreferences.Editor editor;
    private String payOk="0";
    private String extendDate=null;
    private String lastConnectDate=null;
    private int isCheckPayOk = 0;
    private String script;
    private String urlWebView=null;
    private String urlHiddenView=null;
    private String jsHiddenView=null;
    private boolean isTouchScreenMode=false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_main);
/*
        sid = getDeviceId();
        today = getToday();

        SharedPreferences pref = getSharedPreferences("pref", MODE_PRIVATE);
        editor = pref.edit();
        ssid = pref.getString("deviceId", null);
        dday = pref.getString("expDate", null);
        payOk = pref.getString("payOk", "1");
        extendDate = pref.getString("extendDate", "9999-99-99");
        lastConnectDate = pref.getString("lastConnectDate", null);

        if(lastConnectDate!=null && today.compareTo(lastConnectDate)<0) { //날짜변조의심
            Toast.makeText(getApplicationContext(), "날짜변조가 의심되어 종료합니다", Toast.LENGTH_LONG).show();
            finish();
            return;
        }
        else {
            if(lastConnectDate==null || lastConnectDate.compareTo(today)!=0)
                editor.putString("lastConnectDate", today);
        }
        if( !payOk.equals("1") ) {
            if (today.compareTo(extendDate) > 0) { //기간연장신청후 하루이상 지났음
                isCheckPayOk = 1;
                Toast.makeText(getApplicationContext(), "입금확인이 되지않아 입금확인체크창으로 이동합니다.", Toast.LENGTH_LONG).show();
            }
            else {
                Toast.makeText(getApplicationContext(), "오늘까지 입금확인이 되어야 계속 시청이 가능합니다.", Toast.LENGTH_LONG).show();
            }
        }
        if(today.equals(dday)) {
            if( payOk.equals("1") )
                Toast.makeText(getApplicationContext(), "오늘이 지나면 기간만료 입니다(내일은 기간연장 페이지로 이동합니다)", Toast.LENGTH_LONG).show();
        }
*/
        webView = (WebView) findViewById(R.id.webView);
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                WebView newWebView = new WebView(MainActivity.this);
                WebSettings webSettings = newWebView.getSettings();
                webSettings.setJavaScriptEnabled(true);

                // Other configuration comes here, such as setting the WebViewClient

                final Dialog dialog = new Dialog(MainActivity.this);
                dialog.setContentView(newWebView);
                dialog.show();

                newWebView.setWebChromeClient(new WebChromeClient() {
                    @Override
                    public void onCloseWindow(WebView window) {
                        dialog.dismiss();
                    }
                });

                ((WebView.WebViewTransport)resultMsg.obj).setWebView(newWebView);
                resultMsg.sendToTarget();
                return true;
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            @TargetApi(Build.VERSION_CODES.N)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url=request.getUrl().toString();
                //Toast.makeText(getApplicationContext(), url+" -2", Toast.LENGTH_LONG).show();
                view.loadUrl(url);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                findViewById(R.id.caption).setVisibility(View.GONE);

                String script = null;
                script = "javascript:function addMyScript(){ var s=document.createElement('script'); s.setAttribute('src','https://hshin09.github.io/shinwebtv/mainview.js'); document.body.appendChild(s); } addMyScript();";
                view.loadUrl(script);
            }
        });

        webView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void showMsg(String msg) {
                msg=msg.trim();
                //Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();
                if(msg.startsWith("launchApp:")) {
                    script = msg.substring(10);
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Intent launchIntent = getPackageManager().getLaunchIntentForPackage(script);
                            startActivity( launchIntent );
                        }
                    });
                } else if(msg.startsWith("adView:")) {
                    script=msg.substring(7);
                    adView.post(new Runnable() {
                        @Override
                        public void run() {
                            adView.evaluateJavascript(script,null);
                        }
                    });
                }
                else if(msg.startsWith("79:")) {
                    String message=msg.substring(3);
                    script = "javascript:getHiddenViewTV('" + message + "');";

                    hiddenView.post(new Runnable() {
                        @Override
                        public void run() {
                            hiddenView.evaluateJavascript(script,null);
                        }
                    });
                }
                else if(msg.startsWith("hiddenView:")) {
                    String message=msg.substring(11);
                    script = "javascript:" + message + ";";

                    hiddenView.post(new Runnable() {
                        @Override
                        public void run() {
                            hiddenView.evaluateJavascript(script,null);
                        }
                    });
                } else if(msg.startsWith("trueView:")) {
                    String message=msg.substring(9);
                    script = "javascript:" + message + ";";

                    trueView.post(new Runnable() {
                        @Override
                        public void run() {
                            trueView.evaluateJavascript(script,null);
                        }
                    });
                } else if(msg.startsWith("showTrueView")) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            showTrueView();
                        }
                    });
                } else if(msg.startsWith("hideTrueView")) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            hideTrueView();
                        }
                    });
                } else if(msg.startsWith("trueViewLoadUrl:")) {
                    String message=msg.substring(16);
                    script = message;

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            trueViewLoadUrl(script);
                        }
                    });
                }else if(msg.equals("finish")) {
                    finish();
                }
                else if(msg.startsWith("msg:")) {
                    String message;
                    message = msg.substring(4);
                    Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG).show();
                }
                else if( msg.equals("0") ) //press cancel extent time
                {
                    Toast.makeText(getApplicationContext(), "취소되었습니다.", Toast.LENGTH_LONG).show();
                    finish();
                }
                else if( msg.equals("1") ) //not yet pay
                {
                    Toast.makeText(getApplicationContext(), "아직 입금확인이 되지 않았습니다. 잠시후 다시 시도해보세요", Toast.LENGTH_LONG).show();
                    finish();
                }
                else if( msg.equals("2") ) { //pay ok
                    payOk = "1";
                    editor.putString("payOk", payOk);
                    editor.putString("extendDate", today);
                    editor.apply();
                    Toast.makeText(getApplicationContext(), "입금확인완료 "+dday + " 까지 사용가능합니다", Toast.LENGTH_LONG).show();

                    Intent intent = getIntent();
                    finish();
                    startActivity(intent);
                }
                else if(msg.length()>20) { //request old data when apk reinstall
                    dday = msg.substring(0,11);
                    String ed = msg.substring(11);
                    if (ssid == null)
                        editor.putString("deviceId", sid);
                    payOk = dday.substring(0, 1);
                    dday = dday.substring(1);
                    editor.putString("payOk", payOk);
                    editor.putString("expDate", dday);
                    editor.putString("extendDate", ed);
                    editor.apply();
                    Toast.makeText(getApplicationContext(), "데이터복구완료 "+ dday + " 까지 사용가능합니다", Toast.LENGTH_LONG).show();

                    Intent intent = getIntent();
                    finish();
                    startActivity(intent);
                }
                else { //normal
                    dday = msg;
                    if (ssid == null)
                        editor.putString("deviceId", sid);
                    payOk = dday.substring(0, 1);
                    dday = dday.substring(1);
                    editor.putString("payOk", payOk);
                    editor.putString("expDate", dday);
                    editor.putString("extendDate", today);
                    editor.apply();
                    Toast.makeText(getApplicationContext(), dday + " 까지 사용가능합니다", Toast.LENGTH_LONG).show();
                    //recreate(); //instead finish();
                    Intent intent = getIntent();
                    finish();
                    startActivity(intent);
                }
            }
        }, "parentView");

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        webView.getSettings().setAppCacheEnabled(true);
        webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        webView.getSettings().setSupportMultipleWindows(true);
        webView.getSettings().setSupportZoom(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setTextZoom(100);
        webView.getSettings().setUseWideViewPort(true);
        webView.getSettings().setGeolocationEnabled(true);
        webView.getSettings().supportMultipleWindows();
        webView.getSettings().setBuiltInZoomControls(true);
        webView.getSettings().setDatabaseEnabled(true);
        webView.getSettings().setLoadsImagesAutomatically(true);
        webView.getSettings().setLoadWithOverviewMode(true);

        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
/*        if(isCheckPayOk==1) {
            webView.loadUrl("http://shinwebtv.000webhostapp.com/getPayOk.php?sid=" + sid );
            return;
        }
        //Toast.makeText(getApplicationContext(),ssid+":"+dday+":"+today,Toast.LENGTH_LONG).show();
        if( ssid == null || dday == null || today.compareTo(dday) > 0 ) {
            if (getPackageManager().hasSystemFeature(PackageManager.FEATURE_TOUCHSCREEN))
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            webView.loadUrl("http://shinwebtv.000webhostapp.com/getExtendTime.php?sid=" + sid + "&today=" + today);
        }
        else
*/
        {

            adView=findViewById(R.id.adView);
            adView.addJavascriptInterface(new Object() {
                @JavascriptInterface
                public void showMsg(String msg) {
                    msg=msg.trim();

                    int index1 = msg.indexOf("hv:");
                    int index2 = msg.indexOf("js:");

                    urlWebView = msg.substring(0,index1);
                    urlHiddenView = msg.substring( index1+3,index2 );
                    jsHiddenView = msg.substring(index2+3);

                    hiddenView=findViewById(R.id.hiddenView);

                    adView.post(new Runnable() {
                        @Override
                        public void run() {
                            hiddenView.setWebChromeClient(new WebChromeClient());
                            hiddenView.setWebViewClient(new WebViewClient() {
                                @TargetApi(Build.VERSION_CODES.N)
                                @Override
                                public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                                    String url = request.getUrl().toString();
                                    view.loadUrl(url);
                                    return true;
                                }

                                @Override
                                public void onPageFinished(WebView view, String url) {
                                    String script = null;
                                    script = "javascript:var request;var strRes='';function getHiddenViewTV(msg){request = new XMLHttpRequest();demostr='';request.open('GET',msg,false);";
                                    script += "request.send(null);if(!state_change())return; parseTV(); window.hiddenView.showMsg(strRes);}";
                                    script += "function state_change(){if(request.readyState==4){if(request.status==200){strRes=request.responseText;if(strRes.length<1)return false;";
                                    script += "return true;}}return false;}";
                                    script += "function parseTV()" + jsHiddenView;

                                    view.loadUrl(script);
                                }
                            });
                        }
                    });

                    adView.post(new Runnable() {
                        @Override
                        public void run() {
                            hiddenView.addJavascriptInterface(new Object() {
                                @JavascriptInterface
                                public void showMsg(String msg) {
                                    msg = msg.trim();
                                    if(msg.startsWith("webView:")) {
                                        String message = msg.substring(8);
                                        script = "javascript:" + message + ";";

                                        webView.post(new Runnable() {
                                            @Override
                                            public void run() {
                                                webView.evaluateJavascript(script, null);
                                            }
                                        });
                                    } else if(msg.startsWith("msg:")) {
                                        String message;
                                        message = msg.substring(4);
                                        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG).show();
                                    } else {
                                        script = "javascript:setHiddenViewTV('" + msg + "');";
                                        webView.post(new Runnable() {
                                            @Override
                                            public void run() {
                                                webView.evaluateJavascript(script, null);
                                            }
                                        });
                                        //Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();
                                    }
                                }
                            }, "hiddenView");


                            hiddenView.getSettings().setJavaScriptEnabled(true);
                            hiddenView.getSettings().setAppCacheEnabled(false);
                            hiddenView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);

                            hiddenView.loadUrl(urlHiddenView);

                            isTouchScreenMode = getPackageManager().hasSystemFeature(PackageManager.FEATURE_TOUCHSCREEN);
                            if( isTouchScreenMode )
                                webView.loadUrl("file:///android_asset/www/main2.html");
                            else
                                webView.loadUrl(urlWebView);
                        }
                    });
                }
            }, "adView");
            adView.getSettings().setJavaScriptEnabled(true);
            adView.getSettings().setAppCacheEnabled(false);
            adView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);


            adView.loadUrl("https://hshin09.github.io/shinwebtv/hiddenviewurl.html");
        }
    }

    private void trueViewLoadUrl(String trueUrl)
    {
        trueView=findViewById(R.id.trueView);

        trueView.setWebChromeClient(new WebChromeClient());
        trueView.setWebViewClient(new WebViewClient() {
            @TargetApi(Build.VERSION_CODES.N)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                view.loadUrl(url);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                //Toast.makeText(getApplicationContext(), "onPageFinished(trueView):"+url, Toast.LENGTH_LONG).show();
                String script = null;
                script = "javascript:function addMyScript(){ var s=document.createElement('script'); s.setAttribute('src','https://hshin09.github.io/shinwebtv/trueview.js'); document.body.appendChild(s); } addMyScript(); ";
                script += "var isTouchScreenMode = " + isTouchScreenMode + ";";
                view.loadUrl(script);
            }
        });

        trueView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void showMsg(String msg) {
                msg = msg.trim();
                if (msg.startsWith("webView:")) {
                    String message = msg.substring(8);
                    script = "javascript:" + message + ";";

                    webView.post(new Runnable() {
                        @Override
                        public void run() {
                            webView.evaluateJavascript(script, null);
                        }
                    });
                } else if (msg.startsWith("msg:")) {
                    String message;
                    message = msg.substring(4);
                    Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG).show();
                } else if (msg.startsWith("showTrueView")) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            showTrueView();
                        }
                    });
                } else if (msg.startsWith("hideTrueView")) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            hideTrueView();
                        }
                    });
                }
            }
        }, "trueView");


        trueView.getSettings().setJavaScriptEnabled(true);
        trueView.getSettings().setAllowFileAccess(true);
        trueView.getSettings().setAllowContentAccess(true);
        trueView.getSettings().setAllowFileAccessFromFileURLs(true);
        trueView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        trueView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        trueView.getSettings().setAppCacheEnabled(true);
        trueView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        trueView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        trueView.getSettings().setSupportMultipleWindows(true);
        trueView.getSettings().setSupportZoom(true);
        trueView.getSettings().setDomStorageEnabled(true);
        trueView.getSettings().setTextZoom(100);
        trueView.getSettings().setUseWideViewPort(true);
        trueView.getSettings().setGeolocationEnabled(true);
        trueView.getSettings().supportMultipleWindows();
        trueView.getSettings().setBuiltInZoomControls(true);
        trueView.getSettings().setDatabaseEnabled(true);
        trueView.getSettings().setLoadsImagesAutomatically(true);
        trueView.getSettings().setLoadWithOverviewMode(true);

        trueView.setLayerType(View.LAYER_TYPE_HARDWARE, null);


        //Toast.makeText(getApplicationContext(), "loadUrl:" + trueUrl, Toast.LENGTH_LONG).show();
        trueView.loadUrl(trueUrl);
        showTrueView();
    }

    private void showTrueView()
    {
        trueView.setVisibility(View.VISIBLE);
        webView.setVisibility(View.GONE);
    }

    private void hideTrueView()
    {
        trueView.setVisibility(View.GONE);
        webView.setVisibility(View.VISIBLE);
    }

    private String getDeviceId()
    {
        String s = null;
        try {
            s = Build.class.getField("SERIAL").get(null).toString()+"-";
            s += Settings.Secure.getString(getApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID);

        } catch (IllegalAccessException e) {
            s=null;
        } catch (NoSuchFieldException e) {
            s=null;
        }
        return s;
    }

    private String getToday() {
        long now = System.currentTimeMillis(); // 현재시간 받아오기
        Date date = new Date(now); // Date 객체 생성
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }

    @Override
    protected void onPause() {
        super.onPause();
        if(webView!=null) webView.pauseTimers();
        if(adView!=null) adView.pauseTimers();
        if(hiddenView!=null) hiddenView.pauseTimers();
        if(trueView!=null) trueView.pauseTimers();

        try {
            Class.forName("android.webkit.WebView")
                    .getMethod("onPause", (Class[]) null)
                    .invoke(webView, (Object[]) null);
        } catch(Exception e) {
            e.printStackTrace();
        }

    }
    @Override
    protected void onResume() {
        super.onResume();
        if(webView!=null) webView.resumeTimers();
        if(adView!=null) adView.resumeTimers();
        if(hiddenView!=null) hiddenView.resumeTimers();
        if(trueView!=null) trueView.resumeTimers();

        try {
            Class.forName("android.webkit.WebView")
                    .getMethod("onResume", (Class[]) null)
                    .invoke(webView, (Object[]) null);
        } catch(Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void onDestroy() {
        if(webView!=null) {
            webView.stopLoading();
            webView.setWebViewClient(null);
            webView.setWebChromeClient(null);
            webView.destroy();
            webView = null;
        }

        if(adView!=null) {
            adView.stopLoading();
            adView.setWebViewClient(null);
            adView.setWebChromeClient(null);
            adView.destroy();
            adView = null;
        }

        if(hiddenView!=null) {
            hiddenView.stopLoading();
            hiddenView.setWebViewClient(null);
            hiddenView.setWebChromeClient(null);
            hiddenView.destroy();
            hiddenView = null;
        }

        if(trueView!=null) {
            trueView.stopLoading();
            trueView.setWebViewClient(null);
            trueView.setWebChromeClient(null);
            trueView.destroy();
            trueView = null;
        }

        super.onDestroy();
    }

}
