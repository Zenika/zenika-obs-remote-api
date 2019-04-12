package zenika.obs.api;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CameraRemote {
    @ConfigProperty(name = "camera.config.protocol") public String protocol;
    @ConfigProperty(name = "camera.user") public String user;
    @ConfigProperty(name = "camera.password") public String password;
    @ConfigProperty(name = "camera.host") public String host;
    @ConfigProperty(name = "camera.default.speed") public String speed;

    private CloseableHttpClient httpClient;
    private String baseUrl;

    private String moveUp = "?cmd=ptzctrl&-step=0&-act=up&-speed=";
    private String moveDown = "?cmd=ptzctrl&-step=0&-act=down&-speed=";
    private String moveRight = "?cmd=ptzctrl&-step=0&-act=right&-speed=";
    private String moveLeft = "?cmd=ptzctrl&-step=0&-act=left&-speed=";
    private String stop = "?cmd=ptzctrl&-step=0&-act=stop&-speed=";

    public Boolean moveTo(String direction) {

        String moveTo = null;

        switch (direction) {
            case "up":
                moveTo = moveUp;
                break;
            case "down":
                moveTo = moveDown;
                break;
            case "right":
                moveTo = moveRight;
                break;
            case "left":
                moveTo = moveLeft;
                break;
            case "stop":
                moveTo = stop;
                break;
            default:
                break;
        }

        return move(moveTo);
    }

    private Boolean move(String direction) {
        if(direction == null)
            return false;

        StringBuilder sb = new StringBuilder();
        baseUrl = sb.append(protocol).append("://")
                .append(user).append(":")
                .append(password).append("@")
                .append(host)
                .toString();

        System.out.println("Creating camera remote with following values");
        System.out.println("   => protocol = " + protocol);
        System.out.println("   => user = " + user);
        System.out.println("   => password = " + password);
        System.out.println("   => host = " + host);
        System.out.println("   => speed = " + speed);

        System.out.println("Sending following request :");
        this.httpClient = HttpClients.createDefault();
        CloseableHttpResponse httpResponse = null;
        Boolean moved = false;

        try {
            System.out.println("   => GET " + baseUrl.concat(direction).concat(speed));
            httpResponse = Utils.sendGetRequestToNodeAPI(
                    httpClient,
                    baseUrl.concat(direction).concat(speed),
                    null);
            if (httpResponse.getStatusLine().getStatusCode() == 200) {
                moved = true;
            } else {
                moved = false;
            }
            this.httpClient.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return moved;
        }
    }
}