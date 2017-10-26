// 手电筒
// 照亮你的美~

// 导入安卓基类
import AndroidBase from './AndroidBase.js'

class Flashlight extends AndroidBase {
	constructor() {
		super()
	}

	deviceReady() {
        super.deviceReady()
        // 默认是关闭状态
        this.state = false
        // 是否高版本
        let isHight = plus.os.version.split('.')[0] >= 6

        if(isHight){
            plus.android.importClass("android.hardware.camera2.CameraManager")
            var manager = this.MainActivity.getSystemService(this.Context.CAMERA_SERVICE)
            this._open = () => {
                try {
                    manager.setTorchMode("0", true)
                    this.state = true
                } catch(e) {
                    console.log(e)
                }
            }
            this._close = () => {
                try {
                    manager.setTorchMode("0", false)
                    this.state = false
                } catch(e) {
                    console.log(e)
                }
            }
        }else{
            var Camera = plus.android.importClass("android.hardware.Camera")
            var PackageManager = plus.android.importClass('android.app.ApplicationPackageManager')
            var hasFlash = MainActivity.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_FLASH)
            var m_Camera = null
            this._open = () => {
                if(!hasFlash){return}
                if(m_Camera === null){
                    m_Camera = Camera.open()
                }
                var parameters = m_Camera.getParameters()
                parameters.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH)
                m_Camera.setParameters(parameters)
                m_Camera.startPreview()
                this.state = true

            }
            this._close = () => {
                if(!hasFlash){return}
                if (m_Camera !== null) {
                    m_Camera.stopPreview()
                    m_Camera.release()
                    m_Camera = null
                    this.state = false
                }
            }
        }
	}

    open(){
        this._open()
    }

    close(){
        this._close()
    }

    toggle(){
        this[this.state ? "close": "open"]()
    }

}

export default Flashlight