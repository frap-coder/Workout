package nl.frapcoder.workout;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.view.WindowManager;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "WorkoutNative")
public class WorkoutNativePlugin extends Plugin {
    @PluginMethod
    public void openExternal(PluginCall call) {
        Uri uri = Uri.parse(call.getString("url", ""));
        if (!"https".equals(uri.getScheme()) || uri.getHost() == null || "localhost".equals(uri.getHost())) {
            call.reject("Invalid external URL"); return;
        }
        getActivity().runOnUiThread(() -> {
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                intent.addCategory(Intent.CATEGORY_BROWSABLE);
                getActivity().startActivity(intent); call.resolve();
            } catch (ActivityNotFoundException error) { call.reject("No browser available"); }
        });
    }

    @PluginMethod
    public void setKeepAwake(PluginCall call) {
        boolean enabled = Boolean.TRUE.equals(call.getBoolean("enabled", false));
        getActivity().runOnUiThread(() -> {
            if (enabled) getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            else getActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            call.resolve();
        });
    }

    @PluginMethod
    public void saveBackup(PluginCall call) {
        String data = call.getString("data", "");
        String filename = call.getString("filename", "daily-reps-backup.json");
        if (data.isEmpty() || data.length() > 25 * 1024 * 1024 || !filename.matches("daily-reps-backup-[0-9-]+\\.json")) {
            call.reject("Invalid backup"); return;
        }
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        intent.putExtra(Intent.EXTRA_TITLE, filename);
        getActivity().runOnUiThread(() -> {
            try { startActivityForResult(call, intent, "backupCreated"); }
            catch (ActivityNotFoundException error) { call.reject("No document picker available"); }
        });
    }

    @ActivityCallback
    private void backupCreated(PluginCall call, ActivityResult result) {
        if (call == null) return;
        Uri uri = result.getData() == null ? null : result.getData().getData();
        if (result.getResultCode() != Activity.RESULT_OK || uri == null) {
            JSObject response = new JSObject(); response.put("saved", false); call.resolve(response); return;
        }
        getBridge().execute(() -> {
            try (OutputStream stream = getContext().getContentResolver().openOutputStream(uri, "wt")) {
                if (stream == null) throw new java.io.IOException("No output stream");
                stream.write(call.getString("data", "").getBytes(StandardCharsets.UTF_8));
                stream.flush();
                JSObject response = new JSObject(); response.put("saved", true); call.resolve(response);
            } catch (Exception error) { call.reject("Could not write backup"); }
        });
    }

    @Override
    public Boolean shouldOverrideLoad(Uri uri) {
        String scheme = uri.getScheme();
        if (("https".equals(scheme) || "http".equals(scheme)) && !"localhost".equals(uri.getHost())) {
            getActivity().runOnUiThread(() -> {
                try { getActivity().startActivity(new Intent(Intent.ACTION_VIEW, uri)); }
                catch (ActivityNotFoundException ignored) { /* Keep the workout open if no browser exists. */ }
            });
            return true;
        }
        return null;
    }

    @Override
    protected void handleOnPause() { getBridge().triggerJSEvent("workoutPause", "document"); }

    @Override
    protected void handleOnResume() { getBridge().triggerJSEvent("workoutResume", "document"); }
}
